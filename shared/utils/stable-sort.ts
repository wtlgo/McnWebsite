export const stableSort = <T extends Object>(
    arr: T[],
    field: keyof T,
    asc: boolean = true
) =>
    arr
        .map((item, index) => ({
            item,
            index,
        }))
        .sort((a, b) => {
            const valA = a.item[field];
            const valB = b.item[field];

            if (valA < valB) return asc ? -1 : 1;
            if (valA > valB) return asc ? 1 : -1;

            return a.index - b.index;
        })
        .map(({ item }) => item);
