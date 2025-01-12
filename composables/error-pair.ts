export const useErrorPair = () => {
    const error = ref<string | null>(null);
    const errorVisible = computed<boolean>({
        get: () => !!error.value,
        set(value) {
            if (!value) {
                error.value = null;
            }
        },
    });

    return { error, errorVisible };
};
