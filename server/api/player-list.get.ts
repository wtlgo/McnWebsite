import { PlayerListData } from "~/shared/types/player-list-data";

const getUsersCached = cachedFunction(
    async () =>
        (await getVkUsers())
            .map(
                ({ name, vkId, floodgate, uuid }): PlayerListData => ({
                    name,
                    uuid,
                    vk: vkId,
                    bedrock: !!floodgate,
                })
            )
            .reverse(),
    { maxAge: 60 * 5, name: "get-users-cached" }
);

export default defineEventHandler(async (event) => {
    const { isMember } = await validateJWT(getAccessToken(event));
    if (!isMember) {
        throw createError({ statusCode: 403, message: "Нет доступа" });
    }

    return getUsersCached().then((v) => v ?? []);
});
