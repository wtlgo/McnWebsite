import { useInterval } from "@vueuse/core";

export const useTrippleDotAnimation = (enabled: TValue<boolean> = true) => {
    const counter = useInterval(500, { controls: true });
    const dots = computed(() =>
        [...new Array((counter.counter.value % 3) + 1)].map(() => ".").join("")
    );

    watchEffect(() => {
        if (toValue(enabled)) {
            counter.resume();
        } else {
            counter.pause();
        }
    });

    return dots;
};
