export const useVkApiUserGet = (
    id: TValue<number>,
    enabled: TValue<boolean> = true
) => {
    const { find, add } = useCacheVkUsers();

    const vkApi = useVkApi();

    const { data } = useQuery({
        queryKey: queryKeys.apiVkUserGet(id),
        queryFn: async ({ signal }) => {
            const vid = toValue(id);
            const user = find(vid);
            if (user) return user;

            const additionalUsers = await vkApi.value.userGet(
                { userIds: [vid] },
                signal
            );
            add(additionalUsers);
            return additionalUsers.find((u) => u.id === vid);
        },
        enabled: () => toValue(enabled) && import.meta.client,
        gcTime: Infinity,
        staleTime: Infinity,
    });

    return data;
};
