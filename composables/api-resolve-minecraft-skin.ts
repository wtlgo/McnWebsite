import { Mutex } from "async-mutex";

const mutex = new Mutex();

export const useApiResolveMinecraftSkin = (
    name: TValue<string>,
    enabled: TValue<boolean> = true
) => {
    const user = useUser();
    const requestFetch = useRequestFetch();

    const { data, suspense, isLoading } = useQuery({
        queryKey: queryKeys.apiResolveMinecraftSkin(name),
        queryFn: async ({ signal }) =>
            mutex
                .runExclusive(() =>
                    requestFetch("/api/resolve-minecraft-skin", {
                        params: { name: toValue(name) },
                        signal,
                    })
                )
                .then((v) => v ?? null),

        enabled: () => !!user.value?.isMember && toValue(enabled),
    });

    onServerPrefetch(suspense);

    const safeSkin = computed(
        () => data.value?.replace("http://", "https://") ?? null
    );

    return { skin: safeSkin, isLoading };
};
