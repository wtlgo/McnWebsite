export const useApiProfiles = () => {
    const user = useUser();

    const query = useQuery({
        queryKey: queryKeys.apiProfiles(),
        queryFn: async ({ signal }) =>
            $fetch("/api/profiles", {
                signal,
            }),
        enabled: () => !!user.value?.isMember,
    });

    onServerPrefetch(query.suspense);

    return query;
};
