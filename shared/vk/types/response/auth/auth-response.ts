import { z } from "zod";

export const authResponseSchema = z
    .object({
        response: z.object({
            access_token: z.string(),
            expires_in: z.coerce.number(),
            user_id: z.coerce.number(),
        }),
    })
    .transform((res) => res.response);
