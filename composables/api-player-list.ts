export const useApiPlayerList = () => {
    const { token, auth } = useAuthData();
    const query = useQuery({
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

    onServerPrefetch(query.suspense);

    const safeData = computed(() => query.data.value ?? []);

    const userIds = computed(() => [
        ...new Set(query.data.value?.map((u) => u.vk) ?? []),
    ]);
    usePreloadVkUsers(userIds);

    return query;
};
