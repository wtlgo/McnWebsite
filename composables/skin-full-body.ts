export const useSkinFullBody = (
    name: TValue<string>,
    size: TValue<number> = 32
) => {
    const url = useApiSkin(name);

    const { data } = useQuery({
        queryKey: queryKeys.localFullBodyRender(url, size),
        queryFn: () => fullBodyRenderFromSkin(url.value, toValue(size)),
        enabled: () => import.meta.client,
    });

    return data;
};
