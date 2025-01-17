export const useApiSkin = (
    name: TValue<string>,
    enabled: TValue<boolean> = true
) => {
    const { token, auth } = useAuthData();
    const { data } = useQuery({
        queryKey: queryKeys.apiSkin(name),
        queryFn: async ({ signal }) =>
            $fetch("/api/skin", {
                signal,
                query: { name: toValue(name) },
                headers: {
                    ...toBearerHeader(token),
                },
            }).then((v) => v.url),
        enabled: () =>
            !!token.value &&
            auth.value.valid &&
            auth.value.isMember &&
            toValue(enabled),
    });

    return data;
};
