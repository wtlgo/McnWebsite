export default defineEventHandler(async (event) => {
    if (!import.meta.dev) {
        throw createError({
            statusCode: 403,
        });
    }

    const name = "MikChan"; // "VisageDvache"; //"h3lm3t";

    return { url: await getSkinUrl(name) };
});
