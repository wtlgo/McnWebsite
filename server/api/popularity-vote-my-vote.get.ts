import { z } from "zod";

const querySchema = z.object({
    from: z.coerce.number(),
    to: z.string().transform((v) => v.split(",").map((it) => parseInt(it))),
});

// TODO: Add to utility, make multiple params
const zip = <M, N>(a: M[], b: N[]) =>
    Array.from(
        Array(Math.max(b.length, a.length)),
        (_, i) => [a[i], b[i]] as const
    );

export default defineEventHandler(async (event) => {
    const { isMember, id } = await validateJWT(getAccessToken(event));
    if (!isMember) {
        throw createError({ statusCode: 403, message: "Нет доступа" });
    }

    const { from, to } = getZodQuery(event, querySchema);
    if (from !== id) {
        throw createError({ statusCode: 403, message: "Нет доступа" });
    }

    return Promise.all(to.map(async (toId) => getVote(id, toId)));
});
