export const useBoolQuery = (name: string) => {
    const strVal = useRouteQuery(name);
    const boolVal = computed({
        get() {
            return strVal.value === "1";
        },
        set(val) {
            if (val) {
                strVal.value = "1";
            } else {
                strVal.value = undefined;
            }
        },
    });

    return boolVal;
};
