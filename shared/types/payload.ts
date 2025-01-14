import { z } from "zod";

export const payloadSchema = z.object({
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
