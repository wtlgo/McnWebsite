import cover from "~/assets/fallback_cover.jpg";

const fallbackCover = { url: cover, width: 1920, height: 768 };

export const useGroupCover = () => {
    const { data } = useApiGroupCover();
    const { width: displayWidth, platform } = useDisplay();

    const maxImage = computed(() =>
        data.value?.reduce(
            (prev, cur) => (prev.width > cur.width ? prev : cur),
            fallbackCover
        )
    );

    const availableImages = computed(() => {
        const res =
            data.value?.filter(
                ({ width }) => platform.value.ssr || width >= displayWidth.value
            ) ?? [];

        return res.length ? res : [fallbackCover];
    });

    const bestImage = computed<{
        url: string;
        width: number;
        height: number;
    }>(
        () =>
            availableImages.value
                ?.map(({ url, width, height }) => ({
                    url,
                    value: platform.value.ssr
                        ? -width
                        : Math.abs(displayWidth.value - width),
                    width,
                    height,
                }))
                .reduce((prev, cur) => (cur.value < prev.value ? cur : prev)) ??
            maxImage.value ??
            fallbackCover
    );

    return bestImage;
};
