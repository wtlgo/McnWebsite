export const useApiPopularityVoteMyVote = (
    to: TValue<number>,
    enabled: TValue<boolean> = true
) => {
    const { enqueue, fromId } = useMyVoteBatcher();
    const token = useToken();

    const { data, refetch } = useQuery({
        queryKey: queryKeys.apiPopularityVoteMyVote(fromId, to),
        queryFn: ({ signal }) => enqueue(toValue(to), signal),
        enabled: () => !!fromId.value && toValue(enabled),
        gcTime: Infinity,
        staleTime: Infinity,
    });

    const queryClient = useQueryClient();

    const { mutate: cast } = useMutation({
        mutationFn: async (vote: number) => {
            return $fetch("/api/popularity-vote-my-vote", {
                method: "post",
                body: { to: toValue(to), vote },
                headers: { ...toBearerHeader(token) },
            });
        },

        onSettled() {
            refetch();
        },
    });

    const proxyData = computed({
        get() {
            return data.value ?? 0;
        },
        set(vote) {
            queryClient.setQueryData(
                queryKeys.apiPopularityVoteMyVote(fromId, to),
                vote
            );
            cast(vote);
        },
    });

    return proxyData;
};
