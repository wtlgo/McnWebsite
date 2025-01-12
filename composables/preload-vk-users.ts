export const usePreloadVkUsers = (ids: TValue<number[]>) => {
    const { cache, add } = useCacheVkUsers();
    const vkApi = useVkApi();
    const queryClient = useQueryClient();

    const unknownUsers = computed(() =>
        toValue(ids).filter((id) => !cache.value.find((u) => u.id === id))
    );

    watchEffect((onCleanup) => {
        if (!import.meta.client) return;
        if (unknownUsers.value.length == 0) return;

        const abortController = new AbortController();
        onCleanup(() => abortController.abort());

        vkApi.value
            .userGet({ userIds: unknownUsers.value }, abortController.signal)
            .then((users) => {
                add(users);
                for (const user of users) {
                    queryClient.setQueryData(
                        queryKeys.apiVkUserGet(user.id),
                        user
                    );
                }
            });
    });
};
