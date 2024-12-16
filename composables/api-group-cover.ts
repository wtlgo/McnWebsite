export const useApiGroupCover = () => {
    const { suspense, ...other } = useQuery({
        queryKey: queryKeys.apiGroupCover(),
        queryFn: async ({ signal }) => $fetch("/api/group-cover", { signal }),
    });

    onServerPrefetch(async () => {
        await suspense();
    });

    return { suspense, ...other };
};
