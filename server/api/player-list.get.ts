import { PlayerListData } from "~/shared/types/player-list-data";

export default defineEventHandler(async (event) => {
    const { isMember } = await validateJWT(getAccessToken(event));
    if (!isMember) {
        throw createError({ statusCode: 403, message: "Нет доступа" });
    }

    return (await getVkUsers())
        .map(
            ({ name, vkId, floodgate }): PlayerListData => ({
                name,
                vk: vkId,
                bedrock: !!floodgate,
            })
        )
        .reverse();
});
