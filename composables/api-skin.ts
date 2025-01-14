export const useApiSkin = (name: TValue<string>) => {
    const { token, auth } = useAuthData();
    const { data } = useQuery({
        queryKey: queryKeys.apiSkin(name),
        queryFn: async ({ signal }) =>
            $fetch("/api/skin", {
                signal,
                query: { accessToken: token.value, name: toValue(name) },
            }).then((v) => v.url),
        enabled: () => !!token.value && auth.value.valid && auth.value.isMember,
    });

    return data;
};
