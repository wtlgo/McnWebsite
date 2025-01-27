import { Mutex } from "async-mutex";

const mutex = new Mutex();

export const useApiResolveMinecraftSkin = (
    name: TValue<string>,
    enabled: TValue<boolean> = true
) => {
    const { token, auth } = useAuthData();

    const { data, suspense, isLoading } = useQuery({
        queryKey: queryKeys.apiResolveMinecraftSkin(name),
        queryFn: async ({ signal }) =>
            mutex
                .runExclusive(() =>
                    $fetch("/api/resolve-minecraft-skin", {
                        params: { name: toValue(name) },
                        signal,
                        headers: { ...toBearerHeader(token) },
                    })
                )
                .then((v) => v ?? null),

        enabled: () =>
            !!token.value &&
            auth.value.valid &&
            auth.value.isMember &&
            toValue(enabled),
    });

    onServerPrefetch(suspense);

    const safeSkin = computed(
        () => data.value?.replace("http://", "https://") ?? null
    );

    return { skin: safeSkin, isLoading };
};
