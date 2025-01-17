export const useSkinHead = (
    name: TValue<string>,
    size: TValue<number> = 32,
    enabled: TValue<boolean> = true
) => {
    const url = useApiSkin(name, enabled);
    const safeUrl = computed(() => url.value?.replace("http://", "https://"));

    const { data } = useQuery({
        queryKey: queryKeys.localSkinHead(safeUrl, size),
        queryFn: () => extractFaceFromSkin(safeUrl.value, toValue(size)),
        enabled: () => import.meta.client,
    });

    return data;
};
