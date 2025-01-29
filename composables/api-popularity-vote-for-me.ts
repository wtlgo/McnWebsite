export const useApiPopularityVoteForMe = () => {
    const user = useUser();
    const id = computed(() => user.value?.id);

    const { data, suspense } = useQuery({
        queryKey: queryKeys.apiPopularityVoteForMe(id),
        queryFn: async ({ signal }) =>
            $fetch("/api/popularity-vote-for-me", {
                signal,
            }),
        enabled: () => !!user.value?.isMember,
    });

    onServerPrefetch(suspense);

    return data;
};
