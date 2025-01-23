import { Mutex } from "async-mutex";
import { ImgurClient } from "imgur";

export const useImgurUploader = () => {
    const config = useRuntimeConfig();
    const imgurInstance = shallowRef(
        new ImgurClient({ clientId: config.public.imgurClientId })
    );
    const mutex = shallowRef(new Mutex());

    watchEffect((onClueanup) => {
        const onProgress = (progress: unknown) => {
            console.log(progress);
        };

        onClueanup(() =>
            imgurInstance.value.removeListener("uploadProgress", onProgress)
        );

        imgurInstance.value.addListener("uploadProgress", onProgress);
    });

    type Payload = Parameters<typeof imgurInstance.value.upload>[0];
    const { mutate: upload, mutateAsync: uploadAsync } = useMutation({
        mutationFn: (payload: Payload) =>
            mutex.value.runExclusive(() => imgurInstance.value.upload(payload)),
    });

    return { upload, uploadAsync };
};
