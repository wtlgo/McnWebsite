export const useToken = () => {
    const token = useCookie<string | null>("auth-data", {
        default: () => null,
        watch: true,
        maxAge: 60 * 60 * 24 * 365,
    });

    return token;
};
