export const extractFaceFromSkin = async (
    url: string | null | undefined,
    size: number = 64
) => {
    if (!url) return null;

    try {
        const img = new Image();

        const doneLoading = new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
        });

        img.crossOrigin = "Anonymous";
        img.src = url;

        await doneLoading;

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return null;

        canvas.width = size;
        canvas.height = size;
        ctx.imageSmoothingEnabled = false;

        ctx.drawImage(img, 8, 8, 8, 8, 0, 0, size, size);

        ctx.globalAlpha = 1.0;
        ctx.drawImage(img, 40, 8, 8, 8, 0, 0, size, size);

        return canvas.toDataURL("image/png");
    } catch (err) {
        console.error(err);
        return null;
    }
};
