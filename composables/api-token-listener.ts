export enum TokenResult {
    PENDING,
    SUCCESS,
    ERROR,
}

export const useApiTokenListener = () => {
    const route = useRoute();
    const validData = computed(() => {
        const query = route.query["payload"]?.toString();
        if (!query) return null;
        try {
            return JSON.parse(query);
        } catch (err) {
            console.error(err);
            return null;
        }
    });

    const { auth, token } = useAuthData();
    const error = useState<unknown>("api-token-listener__error", () => null);
    watchEffect(async (onCleanup) => {
        if (!validData.value || !import.meta.client) return;
        const controller = new AbortController();
        onCleanup(() => controller.abort());

        try {
            token.value = await $fetch("/api/login", {
                method: "post",
                body: validData.value,
                signal: controller.signal,
            });
        } catch (err) {
            error.value = err;
        }
    });

    return computed(() => {
        if (auth.value.valid) {
            return TokenResult.SUCCESS;
        }
        if (error.value) {
            return TokenResult.ERROR;
        }
        return TokenResult.PENDING;
    });
};
