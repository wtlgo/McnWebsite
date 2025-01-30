export const useApiChangeSkin = () => {
    const queryClient = useQueryClient();
    const requestFetch = useRequestFetch();
    const { mutate: change, mutateAsync: changeAsync } = useMutation({
        mutationFn: ({ url, name }: { url: string; name: string }) =>
            requestFetch("/api/change-skin", {
                method: "post",
                body: { url, name },
            }),
        onSuccess(_, { name, url }) {
            queryClient.setQueryData(queryKeys.apiSkin(name), url);
        },
    });
    return { change, changeAsync };
};
