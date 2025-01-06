export const useToken = () => {
    const token = useCookie<string | null>("auth-data", {
        default: () => null,
        watch: true,
    });
    return token;
};
