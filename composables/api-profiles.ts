export const useApiProfiles = () => {
    const { token, auth } = useAuthData();
    const query = useQuery({
        queryKey: queryKeys.apiProfiles(),
        queryFn: async ({ signal }) =>
            $fetch("/api/profiles", {
                signal,
                headers: {
                    ...toBearerHeader(token),
                },
            }),
        enabled: () => !!token.value && auth.value.valid && auth.value.isMember,
    });

    onServerPrefetch(query.suspense);

    return query;
};
