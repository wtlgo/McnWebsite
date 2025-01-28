export const useDisjunctiveFilter = <T>(
    array: TValue<T[]>,
    filters: TValue<((_: T) => boolean)[]>
) =>
    computed(() =>
        toValue(array).filter((val) => toValue(filters).some((f) => f(val)))
    );
