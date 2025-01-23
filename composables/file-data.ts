export const useFileData = (f: TValue<File | null>) =>
    computedAsync(async () => {
        const file = toValue(f);
        if (!file) return null;
        return new Uint8Array(await file.arrayBuffer());
    }, null);
