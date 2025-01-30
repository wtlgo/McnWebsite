export const useApiPopularityVoteMyVote = (
    to: TValue<number>,
    enabled: TValue<boolean> = true
) => {
    const { enqueue, fromId } = useMyVoteBatcher();
    const token = useToken();

    const { data, refetch } = useQuery({
        queryKey: queryKeys.apiPopularityVoteMyVote(fromId, to),
        queryFn: ({ signal }) => enqueue(toValue(to), signal),
        enabled: () => import.meta.client && !!fromId.value && toValue(enabled),
        gcTime: Infinity,
        staleTime: Infinity,
    });

    const queryClient = useQueryClient();
    const requestFetch = useRequestFetch();

    const { mutate: cast } = useMutation({
        mutationFn: async (vote: number) => {
            return requestFetch("/api/popularity-vote-my-vote", {
                method: "post",
                body: { to: toValue(to), vote },
                headers: { ...toBearerHeader(token) },
            });
        },

        onSettled() {
            refetch();
        },
    });

    const safe = computed(() => data.value ?? 0);

    const proxy = ref(safe.value);
    watch(safe, () => {
        if (proxy.value != safe.value) {
            proxy.value = safe.value;
        }
    });

    watch(proxy, () => {
        if (proxy.value != safe.value) {
            cast(proxy.value);
        }
    });

    return proxy;
};
