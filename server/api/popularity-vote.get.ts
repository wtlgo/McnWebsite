import { canPopularityVote } from "~/shared/utils/abilities.ts";
import { sortPopularityVote } from "~/shared/utils/sort-popularity-vote";

export default defineEventHandler(async (event) => {
    await authorize(event, canPopularityVote);

    const vkUsers = await getVkUsers();
    const ids = [...new Set(vkUsers.map((u) => u.vkId))].reverse();

    const scores = await Promise.all(
        ids.map(async (id) => [id, await getScore(id)] as const)
    ).then((v) => new Map(v));

    return sortPopularityVote(
        ids.map((id) => ({
            id,
            score: scores.get(id) ?? 0,
            usernames: vkUsers
                .filter((vku) => vku.vkId === id)
                .map((vku) => vku.name),
        }))
    );
});
