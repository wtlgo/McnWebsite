import { z } from "zod";

const querySchema = z.object({
    accessToken: z.string().min(1),
    name: z.string().min(1),
});

export default defineCachedEventHandler(
    async (event) => {
        const { accessToken, name } = getZodQuery(event, querySchema);
        const { isMember } = await validateJWT(accessToken);
        if (!isMember) {
            throw createError({ statusCode: 403 });
        }

        return { url: await getSkinUrl(name) };
    },
    { maxAge: 30 * 60 }
);
