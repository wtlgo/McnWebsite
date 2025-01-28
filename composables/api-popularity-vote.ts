export const useApiPopularityVote = () => {
    const { token, auth } = useAuthData();

    const query = useQuery({
        queryKey: queryKeys.apiPopularityVote(),
        queryFn: async ({ signal }) =>
            $fetch("/api/popularity-vote", {
                signal,
                headers: {
                    ...toBearerHeader(token),
                },
            }),
        enabled: () => !!token.value && auth.value.valid && auth.value.isMember,
    });

    onServerPrefetch(query.suspense);

    const userIds = computed(() => [
        ...new Set(query.data.value?.map((u) => u.id) ?? []),
    ]);
    usePreloadVkUsers(userIds);

    return query;
};
