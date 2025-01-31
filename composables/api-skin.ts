export const useApiSkin = (
    name: TValue<string>,
    enabled: TValue<boolean> = true
) => {
    const user = useUser();
    const { enqueue } = useSkinBatcher();

    const { data } = useQuery({
        queryKey: queryKeys.apiSkin(name),
        queryFn: ({ signal }) => enqueue(toValue(name), signal),
        enabled: () =>
            import.meta.client && !!user.value?.isMember && toValue(enabled),
        gcTime: 1000 * 60 * 60 * 24,
        staleTime: 1000 * 60 * 60,
    });

    const safeSkin = computed(
        () => data.value?.replace("http://", "https://") ?? null
    );

    const queryClient = useQueryClient();
    const fetch = useRequestFetch();
    const { mutate: refetch, mutateAsync: refetchAsync } = useMutation({
        mutationFn: () =>
            fetch("/api/skin", { query: { name: toValue(name), force: 1 } }),
        onSuccess(data) {
            const skin = data[0];
            queryClient.setQueryData(queryKeys.apiSkin(name), skin ?? null);
        },
    });

    return { skin: safeSkin, refetch, refetchAsync };
};
