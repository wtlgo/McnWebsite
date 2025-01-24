export const useToken = createGlobalState(() => {
    const token = useCookie<string | null>("auth-data", {
        default: () => null,
        watch: true,
    });

    return token;
});
