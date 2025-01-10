import { z } from "zod";

const querySchema = z.object({
    accessToken: z.string().min(1),
});

export default defineEventHandler(async (event) => {
    const { accessToken } = getZodQuery(event, querySchema);
    const { isMember, id } = await validateJWT(accessToken);
    if (!isMember) {
        throw createError({ statusCode: 403 });
    }

    const players = await getVkUsers();
    const thisPlayer = players.filter((p) => p.vkId === id);

    return thisPlayer;
});
