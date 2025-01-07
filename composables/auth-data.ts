import { z } from "zod";
import { payloadSchema } from "~/shared/types/payload";
import { jwtDecode } from "jwt-decode";

const falseVal = { valid: false } as const;

export const useAuthData = () => {
    const token = useToken();
    const auth = computed(() => {
        if (token.value === null) return falseVal;
        const res = payloadSchema
            .and(z.object({ exp: z.coerce.number() }))
            .safeParse(jwtDecode(token.value));
        if (!res.success) return falseVal;
        if (new Date(res.data.exp * 1000) < new Date()) return falseVal;
        return {
            valid: true as const,
            ...res.data,
            token: token.value,
        } as const;
    });
    return { auth, token };
};
