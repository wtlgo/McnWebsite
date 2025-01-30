export const useApiGroupCover = () => {
    const requestFetch = useRequestFetch();

    const q = useQuery({
        queryKey: queryKeys.apiGroupCover(),
        queryFn: async ({ signal }) =>
            requestFetch("/api/group-cover", { signal }),
    });

    onServerPrefetch(q.suspense);

    return q;
};
