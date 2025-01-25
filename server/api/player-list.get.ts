import { PlayerListData } from "~/shared/types/player-list-data";
import { SimpleCache } from "~/shared/utils/simple-cache";

const listCache = new SimpleCache(
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
    60 * 60
);

export default defineEventHandler(async (event) => {
    const { isMember } = await validateJWT(getAccessToken(event));
    if (!isMember) {
        throw createError({ statusCode: 403, message: "Нет доступа" });
    }

    return listCache.get();
});
