const z = 1.96; // 95% confidence
const z2 = z * z;
const m = 0.01;

export const willsonScore = (k: number, n: number) => {
    if (n === 0 || k === 0) return 0;

    const p = k / n;
    if (p === 0) return -1;
    const a = 2 * (n + z2);
    const b = 2 * n * p + z2;
    const c = z * Math.sqrt(z2 - 1 / n + 4 * n * p * (1 - p) + 4 * p - 2) + 1;
    const w = Math.max(0, (b - c) / a);

    return w > m ? (w - m) / (1 - m) : w / m - 1;
};
