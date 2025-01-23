export const useRawRequest = (
    url: TValue<string | null>,
    enabled?: TValue<boolean>
) =>
    computedAsync(async (onCancel) => {
        const abortController = new AbortController();
        onCancel(() => abortController.abort());

        const u = toValue(url);
        if (!u || !toValue(enabled)) return null;
        try {
            return await $fetch(u, {
                signal: abortController.signal,
                responseType: "blob",
            }).then((b) => (b instanceof Blob ? b : null));
        } catch (err) {
            console.error(err);
            return null;
        }
    }, null);
