export const useApiPlayerList = () => {
    const { token, auth } = useAuthData();
    const { data, ...other } = useQuery({
        queryKey: queryKeys.apiPlayerList(),
        queryFn: async ({ signal }) =>
            $fetch("/api/player-list", {
                signal,
                headers: {
                    ...toBearerHeader(token),
                },
            }),
        enabled: () => !!token.value && auth.value.valid && auth.value.isMember,
    });

    onServerPrefetch(other.suspense);

    const safeData = computed(() => data.value ?? []);

    const userIds = computed(() => [
        ...new Set(safeData.value.map((u) => u.vk)),
    ]);
    usePreloadVkUsers(userIds);

    return { data: safeData, ...other };
};
