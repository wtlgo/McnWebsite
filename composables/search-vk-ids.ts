export const useSearchVkIds = (searchTerm: TValue<string>) => {
    const { cache } = useCacheVkUsers();
    const searchedIds = computed(() =>
        cache.value
            .filter((u) =>
                `${u.first_name} ${u.last_name}`
                    .toLowerCase()
                    .includes(toValue(searchTerm).trim().toLowerCase())
            )
            .map((u) => u.id)
    );

    return searchedIds;
};
