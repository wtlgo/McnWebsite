import { canTest } from "~/shared/utils/abilities.ts";

export default defineEventHandler(async (event) => {
    await authorize(event, canTest);

    const name = "MikChan"; // "VisageDvache"; //"h3lm3t";

    return { url: await getSkinUrl(name) };
});
