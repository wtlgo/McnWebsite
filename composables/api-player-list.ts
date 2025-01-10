export const useApiPlayerList = () => {
    const { token, auth } = useAuthData();
    const { data, ...other } = useQuery({
        queryKey: queryKeys.apiPlayerList(),
        queryFn: async ({ signal }) =>
            $fetch("/api/player-list", {
                signal,
                query: { accessToken: token.value },
            }),
        enabled: () => !!token.value && auth.value.valid && auth.value.isMember,
    });

    onServerPrefetch(other.suspense);

    const safeData = computed(() => [...(data.value ?? [])].reverse());

    return { data: safeData, ...other };
};
