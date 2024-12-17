import { z } from "zod";
import { coverSchema } from "./cover";

export const groupsResponseSchema = z
    .object({
        response: z.object({
            groups: z.array(
                z.object({
                    id: z.coerce.number(),
                    is_admin: z.coerce.boolean(),
                    is_member: z.coerce.boolean(),
                    cover: coverSchema.optional(),
                })
            ),
        }),
    })
    .transform((res) => res.response.groups);
