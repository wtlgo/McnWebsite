import { z } from "zod";
import { canFetchLocalSkin } from "~/shared/utils/abilities.ts";
import { enforceCooldown } from "../utils/enforce-cooldown";

const querySchema = z.object({
    name: z.string().min(1),
    force: z.coerce.boolean().optional().transform(v => !!v),
});

export default defineEventHandler(async (event) => {
    await authorize(event, canFetchLocalSkin);

    const { name, force: initForce } = getZodQuery(event, querySchema);
    const names = name.split(",");
    const force = await enforceCooldown(event, initForce, "api-skin");

    return Promise.all(
        names.map(async (name) => {
            if (force) {
                await invalidateSkinUrl(name);
            }

            return getSkinUrl(name);
        })
    );
});
