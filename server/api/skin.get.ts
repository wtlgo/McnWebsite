import { z } from "zod";
import { canFetchLocalSkin } from "~/shared/utils/abilities.ts";

const querySchema = z.object({
    name: z.string().min(1),
});

export default defineEventHandler(async (event) => {
    await authorize(event, canFetchLocalSkin);

    const { name } = getZodQuery(event, querySchema);
    const names = name.split(",");

    return Promise.all(names.map(getSkinUrl));
});
