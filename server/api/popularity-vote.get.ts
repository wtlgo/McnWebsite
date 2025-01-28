import { PopularityVoteData } from "~/shared/types/popularity-vote-data";
import { stableSort } from "~/shared/utils/stable-sort";

export default defineEventHandler(async (event) => {
    const { isMember } = await validateJWT(getAccessToken(event));
    if (!isMember) {
        throw createError({ statusCode: 403, message: "Нет доступа" });
    }

    const vkUsers = await getVkUsers();
    const ids = [...new Set(vkUsers.map((u) => u.vkId))].reverse();

    const scores = await Promise.all(
        ids.map(async (id) => [id, await getScore(id)] as const)
    ).then((v) => new Map(v));

    const scorePlaces = [...new Set([...scores.values(), 0])]
        .sort()
        .reverse()
        .map((score, place) => [score, place] as const);

    return stableSort(
        ids.map(
            (id): PopularityVoteData => ({
                id,
                score: scores.get(id) ?? 0,
                place:
                    (scorePlaces.find(([s]) => s === scores.get(id))?.at(1) ??
                        scorePlaces.length - 1) + 1,
                usernames: vkUsers
                    .filter((vku) => vku.vkId === id)
                    .map((vku) => vku.name),
            })
        ),
        "score",
        false
    );
});
