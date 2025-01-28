export const useApiPopularityVoteForMe = () => {
    const { token, auth } = useAuthData();

    const id = computed(() => (auth.value.valid ? auth.value.id : null));
    const { data, suspense } = useQuery({
        queryKey: queryKeys.apiPopularityVoteForMe(id),
        queryFn: async ({ signal }) =>
            $fetch("/api/popularity-vote-for-me", {
                signal,
                headers: {
                    ...toBearerHeader(token),
                },
            }),
        enabled: () => !!token.value && auth.value.valid && auth.value.isMember,
    });

    onServerPrefetch(suspense);

    return data;
};
