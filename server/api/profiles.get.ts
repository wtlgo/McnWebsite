export default defineEventHandler(async (event) => {
    const { isMember, id } = await validateJWT(getAccessToken(event));
    if (!isMember) {
        throw createError({ statusCode: 403, message: "Нет доступа" });
    }

    const players = await getVkUsers();
    const thisPlayer = players.filter((p) => p.vkId === id);

    return thisPlayer;
});
