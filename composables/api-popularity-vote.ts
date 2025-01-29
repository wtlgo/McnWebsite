export const useApiPopularityVote = () => {
    const user = useUser();

    const query = useQuery({
        queryKey: queryKeys.apiPopularityVote(),
        queryFn: async ({ signal }) =>
            $fetch("/api/popularity-vote", {
                signal,
            }),
        enabled: () => !!user.value?.isMember,
    });

    onServerPrefetch(query.suspense);

    const userIds = computed(() => [
        ...new Set(query.data.value?.map((u) => u.id) ?? []),
    ]);
    usePreloadVkUsers(userIds);

    return query;
};
