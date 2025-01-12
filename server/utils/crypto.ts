import crypto from "node:crypto";

export const toHex = (values: Iterable<number>) =>
    [...values].map((b) => b.toString(16).padStart(2, "0")).join("");

export const sha256 = async (text: string) => {
    const data = new TextEncoder().encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return toHex(new Uint8Array(hashBuffer));
};

export const randomHex = (length: number) => {
    const realLength = Math.max(0, Math.floor(length / 2));
    const values = crypto.getRandomValues(new Uint8Array(realLength));
    return toHex(values);
};
