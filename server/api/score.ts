import { z } from "zod";
import { canViewScore } from "~/shared/utils/abilities.ts";

const querySchema = z.object({
    id: z.coerce.number(),
    force: z.coerce
        .boolean()
        .optional()
        .transform((v) => !!v),
});

export default defineEventHandler(async (event) => {
    await authorize(event, canViewScore);

    const { id, force: initForce } = getZodQuery(event, querySchema);
    const force = await enforceCooldown(event, initForce, "api-score");

    if (force) {
        await invalidateScore(id);
    }

    return getScore(id);
});
