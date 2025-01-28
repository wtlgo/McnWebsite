import { z } from "zod";

const voteSchema = z.object({
    to: z.number(),
    vote: z.union([z.literal(-1), z.literal(0), z.literal(1)]),
});

export default defineEventHandler<{ body: z.infer<typeof voteSchema> }>(
    async (event) => {
        const { isMember, id } = await validateJWT(getAccessToken(event));
        if (!isMember) {
            throw createError({ statusCode: 403, message: "Нет доступа" });
        }

        const { to, vote } = await readValidatedZodBody(event, voteSchema);
        await voteFor(id, to, vote);

        return "OK";
    }
);
