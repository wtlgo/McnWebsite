export const useApiPlayerList = () => {
    const user = useUser();
    const query = useQuery({
        queryKey: queryKeys.apiPlayerList(),
        queryFn: async ({ signal }) =>
            $fetch("/api/player-list", {
                signal,
            }),
        enabled: () => !!user.value?.isMember,
    });

    onServerPrefetch(query.suspense);

    const safeData = computed(() => query.data.value ?? []);

    const userIds = computed(() => [
        ...new Set(query.data.value?.map((u) => u.vk) ?? []),
    ]);
    usePreloadVkUsers(userIds);

    return query;
};
