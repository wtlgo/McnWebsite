export const useApiGroupCover = () => {
    const q = useQuery({
        queryKey: queryKeys.apiGroupCover(),
        queryFn: async ({ signal }) => $fetch("/api/group-cover", { signal }),
    });

    onServerPrefetch(q.suspense);

    return q;
};
