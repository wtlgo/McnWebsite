import { z } from "zod";

const uploadResponseSchema = z
    .object({
        status: z.literal(200),
        data: z.object({
            link: z.string(),
        }),
    })
    .transform((v) => v.data.link);

export const useImgurUploader = () => {
    const config = useRuntimeConfig();

    const { mutate: uploadImgur, mutateAsync: uploadImgurAsync } = useMutation({
        mutationFn: async (file: File) => {
            const formData = new FormData();
            formData.append("image", file);
            const data = await $fetch("https://api.imgur.com/3/image", {
                method: "POST",
                headers: {
                    Authorization: `Client-ID ${config.public.imgurClientId}`,
                },
                body: formData,
            });
            return uploadResponseSchema.parseAsync(data);
        },
    });

    return { uploadImgur, uploadImgurAsync };
};
