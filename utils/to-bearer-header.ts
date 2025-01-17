import type { TValue } from "./types";

export const toBearerHeader = (
    token: TValue<string | undefined | null>
): Record<string, string> => {
    const tokenVal = toValue(token);
    return tokenVal ? { Authorization: `Bearer ${tokenVal}` } : {};
};
