const renderFront = (
    img: HTMLImageElement,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    s: number
) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Head - Front
    ctx.drawImage(img, 8, 8, 8, 8, 4 * s, 0 * s, 8 * s, 8 * s);
    // Torso - Front
    ctx.drawImage(img, 20, 20, 8, 12, 4 * s, 8 * s, 8 * s, 12 * s);
    // Right Leg - Front
    ctx.drawImage(img, 4, 20, 4, 12, 4 * s, 20 * s, 4 * s, 12 * s);
    // Left Leg - Front
    ctx.drawImage(img, 20, 52, 4, 12, 8 * s, 20 * s, 4 * s, 12 * s);
    // Right Arm - Front
    ctx.drawImage(img, 44, 20, 4, 12, 0 * s, 8 * s, 4 * s, 12 * s);
    // Left Arm - Front
    ctx.drawImage(img, 36, 52, 4, 12, 12 * s, 8 * s, 4 * s, 12 * s);

    // Helm - Front
    ctx.drawImage(img, 40, 8, 8, 8, 4 * s, 0 * s, 8 * s, 8 * s);
    // Torso Layer 2 - Front
    ctx.drawImage(img, 20, 36, 8, 12, 4 * s, 8 * s, 8 * s, 12 * s);
    // Right Leg Layer 2 - Front
    ctx.drawImage(img, 4, 36, 4, 12, 4 * s, 20 * s, 4 * s, 12 * s);
    // Left Leg Layer 2 - Front
    ctx.drawImage(img, 4, 52, 4, 12, 8 * s, 20 * s, 4 * s, 12 * s);
    // Right Arm Layer 2 - Front
    ctx.drawImage(img, 44, 36, 4, 12, 0 * s, 8 * s, 4 * s, 12 * s);
    // Left Arm Layer 2 - Front
    ctx.drawImage(img, 52, 52, 4, 12, 12 * s, 8 * s, 4 * s, 12 * s);

    return canvas.toDataURL("image/png");
};

const renderBack = (
    img: HTMLImageElement,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    s: number
) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Head - Back
    ctx.drawImage(img, 24, 8, 8, 8, 4 * s, 0 * s, 8 * s, 8 * s);
    // Torso - Back
    ctx.drawImage(img, 32, 20, 8, 12, 4 * s, 8 * s, 8 * s, 12 * s);
    // Right Leg - Back
    ctx.drawImage(img, 12, 20, 4, 12, 4 * s, 20 * s, 4 * s, 12 * s);
    // Left Leg - Back
    ctx.drawImage(img, 28, 52, 4, 12, 8 * s, 20 * s, 4 * s, 12 * s);
    // Right Arm - Back
    ctx.drawImage(img, 52, 20, 4, 12, 0 * s, 8 * s, 4 * s, 12 * s);
    // Left Arm - Back
    ctx.drawImage(img, 44, 52, 4, 12, 12 * s, 8 * s, 4 * s, 12 * s);

    // Helm - Back
    ctx.drawImage(img, 56, 8, 8, 8, 4 * s, 0 * s, 8 * s, 8 * s);
    // Torso Layer 2 - Back
    ctx.drawImage(img, 32, 36, 8, 12, 4 * s, 8 * s, 8 * s, 12 * s);
    // Right Leg Layer 2 - Back
    ctx.drawImage(img, 12, 36, 4, 12, 4 * s, 20 * s, 4 * s, 12 * s);
    // Left Leg Layer 2 - Back
    ctx.drawImage(img, 12, 52, 4, 12, 8 * s, 20 * s, 4 * s, 12 * s);
    // Right Arm Layer 2 - Back
    ctx.drawImage(img, 52, 36, 4, 12, 0 * s, 8 * s, 4 * s, 12 * s);
    // Left Arm Layer 2 - Back
    ctx.drawImage(img, 60, 52, 4, 12, 12 * s, 8 * s, 4 * s, 12 * s);

    return canvas.toDataURL("image/png");
};

const renderLeft = (
    img: HTMLImageElement,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    s: number
) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Head - Left
    ctx.drawImage(img, 16, 8, 8, 8, 4 * s, 0 * s, 8 * s, 8 * s);
    // Torso - Left
    ctx.drawImage(img, 28, 20, 4, 12, 6 * s, 8 * s, 4 * s, 12 * s);
    // Left Leg - Left
    ctx.drawImage(img, 24, 52, 4, 12, 6 * s, 20 * s, 4 * s, 12 * s);
    // Left Arm - Left
    ctx.drawImage(img, 40, 52, 4, 12, 6 * s, 8 * s, 4 * s, 12 * s);

    // Helm - Left
    ctx.drawImage(img, 48, 8, 8, 8, 4 * s, 0 * s, 8 * s, 8 * s);
    // Torso Layer 2 - Left
    ctx.drawImage(img, 28, 36, 4, 12, 6 * s, 8 * s, 4 * s, 12 * s);
    // Left Leg Layer 2 - Left
    ctx.drawImage(img, 8, 52, 4, 12, 6 * s, 20 * s, 4 * s, 12 * s);
    // Left Arm Layer 2 - Left
    ctx.drawImage(img, 56, 52, 4, 12, 6 * s, 8 * s, 4 * s, 12 * s);

    return canvas.toDataURL("image/png");
};

const renderRight = (
    img: HTMLImageElement,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    s: number
) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Head - Right
    ctx.drawImage(img, 0, 8, 8, 8, 4 * s, 0 * s, 8 * s, 8 * s);
    // Torso - Right
    ctx.drawImage(img, 16, 20, 4, 12, 6 * s, 8 * s, 4 * s, 12 * s);
    // Right Leg - Right
    ctx.drawImage(img, 0, 20, 4, 12, 6 * s, 20 * s, 4 * s, 12 * s);
    // Right Arm - Right
    ctx.drawImage(img, 40, 20, 4, 12, 6 * s, 8 * s, 4 * s, 12 * s);

    // Helm - Right
    ctx.drawImage(img, 32, 8, 8, 8, 4 * s, 0 * s, 8 * s, 8 * s);
    // Torso Layer 2 - Right
    ctx.drawImage(img, 16, 36, 4, 12, 6 * s, 8 * s, 4 * s, 12 * s);
    // Right Leg Layer 2 - Right
    ctx.drawImage(img, 0, 36, 4, 12, 6 * s, 20 * s, 4 * s, 12 * s);
    // Right Arm Layer 2 - Right
    ctx.drawImage(img, 40, 36, 4, 12, 6 * s, 8 * s, 4 * s, 12 * s);

    return canvas.toDataURL("image/png");
};

export const fullBodyRenderFromSkin = async (
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

        const scale = size / 32;
        canvas.width = size / 2;
        canvas.height = size;
        ctx.imageSmoothingEnabled = false;

        return {
            front: renderFront(img, canvas, ctx, scale),
            back: renderBack(img, canvas, ctx, scale),
            left: renderLeft(img, canvas, ctx, scale),
            right: renderRight(img, canvas, ctx, scale),
        };
    } catch (err) {
        console.error(err);
        return null;
    }
};
