export const useSearchQuery = (name: string) => {
    const search = useRouteQuery<string>(name, "");
    const debounced = refDebounced(search, 500);
    const clean = computed(() => debounced.value.trim().toLowerCase());
    const clear = () => (search.value = "");

    return { search, clean, clear };
};
