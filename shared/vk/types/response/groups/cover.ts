import { z } from "zod";

export const coverSchema = z.object({
    enabled: z.coerce.boolean(),
    images: z.array(
        z.object({
            url: z.coerce.string(),
            width: z.coerce.number(),
            height: z.coerce.number(),
        })
    ),
});
