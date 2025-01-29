import { z } from "zod";

const payloadSchema = z.object({
    id: z.number(),
    name: z.string(),
    surname: z.string(),
    photo: z.string().optional(),
    accessToken: z.string(),
    isAdmin: z.boolean(),
    isMember: z.boolean(),
    isExMember: z.boolean(),
    gameTitle: z.string(),
});

export type TPayload = z.infer<typeof payloadSchema>;

export const parsePayload = (payload: unknown): TPayload | null => {
    const res = payloadSchema
        .and(z.object({ exp: z.coerce.number() }))
        .safeParse(payload);
    if (!res.success) return null;
    if (new Date(res.data.exp * 1000) < new Date()) return null;
    return res.data;
};
