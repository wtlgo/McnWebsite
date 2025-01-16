export const useSkinFullBody = (
    name: TValue<string>,
    size: TValue<number> = 32
) => {
    const url = useApiSkin(name);
    const safeUrl = computed(() => url.value?.replace("http://", "https://"));

    const { data } = useQuery({
        queryKey: queryKeys.localFullBodyRender(safeUrl, size),
        queryFn: () => fullBodyRenderFromSkin(safeUrl.value, toValue(size)),
        enabled: () => import.meta.client,
    });

    return data;
};
