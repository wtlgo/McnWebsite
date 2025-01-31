import { z } from "zod";
import pkceChallenge from "pkce-challenge";

const pkceSchema = z.object({
    code_verifier: z.string(),
    code_challenge: z.string(),
});

export const usePkce = createGlobalState(() => {
    const rawVal = useSessionStorage<unknown>("vk_login___pkce", () => ({}));
    const parseVal = computed(() => {
        const res = pkceSchema.safeParse(rawVal.value);
        if (res.success) return res.data;
        return null;
    });

    watchEffect(async () => {
        if (!import.meta.client) return;
        if (parseVal.value) return;
        rawVal.value = await pkceChallenge();
    });

    return parseVal;
});
