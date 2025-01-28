import { getVotedFor } from "../utils/popularity-vote";

export default defineEventHandler(async (event) => {
    const { isMember, id } = await validateJWT(getAccessToken(event));
    if (!isMember) {
        throw createError({ statusCode: 403, message: "Нет доступа" });
    }

    return getVotedFor(id);
});
