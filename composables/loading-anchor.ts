import type { MaybeComputedElementRef } from "@vueuse/core";

const ELEMENTS_STEP = 20;

export const useLoadingAnchor = <T>(
    anchorElement: MaybeComputedElementRef,
    array: TValue<T[]>
) => {
    const elementsVisible = ref(ELEMENTS_STEP);
    const displayValues = computed(() =>
        toValue(array).slice(0, elementsVisible.value)
    );

    const updateElementsVisible = useDebounceFn(() => {
        if (!import.meta.client) return;
        elementsVisible.value = Math.min(
            elementsVisible.value + ELEMENTS_STEP,
            toValue(array).length
        );
    }, 100);

    const canLoadMore = computed(
        () => elementsVisible.value < toValue(array).length
    );

    const isElementVisible = useElementVisibility(anchorElement);
    watchEffect(() => {
        if (isElementVisible.value && elementsVisible.value) {
            updateElementsVisible();
        }
    });

    watch(
        () => toValue(array).length,
        () =>
            (elementsVisible.value = Math.min(
                Math.max(elementsVisible.value, ELEMENTS_STEP),
                toValue(array).length
            ))
    );

    return { displayValues, canLoadMore };
};
