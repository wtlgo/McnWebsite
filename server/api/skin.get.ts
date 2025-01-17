import { z } from "zod";

const querySchema = z.object({
    name: z.string().min(1),
});

export default defineEventHandler(async (event) => {
    const { isMember } = await validateJWT(getAccessToken(event));
    if (!isMember) {
        throw createError({ statusCode: 403, message: "Нет доступа" });
    }

    const { name } = getZodQuery(event, querySchema);
    const names = name.split(",");

    return Promise.all(names.map(getSkinUrl));
});
