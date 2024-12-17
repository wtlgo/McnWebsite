import { z } from "zod";

export const userResponseSchema = z
    .object({
        response: z.array(
            z.object({
                id: z.coerce.number(),
                first_name: z.coerce.string(),
                last_name: z.coerce.string(),
                photo_400: z.coerce.string().optional(),
            })
        ),
    })
    .transform((res) => res.response);
