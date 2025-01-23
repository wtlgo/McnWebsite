export const fileToReadableStream = (
    file: File
): ReadableStream<Uint8Array> => {
    const chunkSize = 64 * 1024;

    return new ReadableStream<Uint8Array>({
        start(controller) {
            const reader = file.stream().getReader();

            const push = async () => {
                const { done, value } = await reader.read();
                if (done) {
                    controller.close();
                    return;
                }
                controller.enqueue(value);
                push();
            };

            push().catch((err) => controller.error(err));
        },
    });
};
