export const useApiProfiles = () => {
    const user = useUser();
    const requestFetch = useRequestFetch();

    const query = useQuery({
        queryKey: queryKeys.apiProfiles(),
        queryFn: async ({ signal }) =>
            requestFetch("/api/profiles", {
                signal,
            }),
        enabled: () => !!user.value?.isMember,
    });

    onServerPrefetch(query.suspense);

    return query;
};
