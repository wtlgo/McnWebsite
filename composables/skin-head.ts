export const useSkinHead = (
    name: TValue<string>,
    size: TValue<number> = 32,
    enabled: TValue<boolean> = true
) => {
    const { skin: url } = useApiSkin(name, enabled);

    const { data } = useQuery({
        queryKey: queryKeys.localSkinHead(url, size),
        queryFn: () => extractFaceFromSkin(url.value, toValue(size)),
        enabled: () => import.meta.client,
    });

    return data;
};
