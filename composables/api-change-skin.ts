export const useApiChangeSkin = () => {
    const queryClient = useQueryClient();
    const { mutate: change, mutateAsync: changeAsync } = useMutation({
        mutationFn: ({ url, name }: { url: string; name: string }) =>
            $fetch("/api/change-skin", {
                method: "post",
                body: { url, name },
            }),
        onSuccess(_, { name, url }) {
            queryClient.setQueryData(queryKeys.apiSkin(name), url);
        },
    });
    return { change, changeAsync };
};
