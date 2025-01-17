export const useApiProfiles = () => {
    const { token, auth } = useAuthData();
    const { data, ...other } = useQuery({
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

    onServerPrefetch(other.suspense);

    const safeData = computed(() => data.value ?? []);

    return { data: safeData, ...other };
};
