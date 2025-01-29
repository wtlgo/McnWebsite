export const useApiSkin = (
    name: TValue<string>,
    enabled: TValue<boolean> = true
) => {
    const user = useUser();
    const { enqueue } = useSkinBatcher();

    const { data } = useQuery({
        queryKey: queryKeys.apiSkin(name),
        queryFn: ({ signal }) => enqueue(toValue(name), signal),
        enabled: () => !!user.value?.isMember && toValue(enabled),
        gcTime: 1000 * 60 * 60 * 24,
        staleTime: 1000 * 60 * 60,
    });

    const safeSkin = computed(
        () => data.value?.replace("http://", "https://") ?? null
    );

    return safeSkin;
};
