export const useImgurUploader = () => {
    const config = useRuntimeConfig();

    const { mutate: uploadImgur, mutateAsync: uploadImgurAsync } = useMutation({
        mutationFn: async (file: File) => {
            const formData = new FormData();
            formData.append("image", file);
            return $fetch("https://api.imgur.com/3/image", {
                method: "POST",
                headers: {
                    Authorization: `Client-ID ${config.public.imgurClientId}`,
                },
                body: formData,
            });
        },
    });

    return { uploadImgur, uploadImgurAsync };
};
