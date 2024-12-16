export const queryKeys = {
    mcSrvStatApi: (ip: unknown) => ["api", "mcsrvstat", ip],

    apiBase: () => ["api", "client"],
    apiGroupCover: () => [...queryKeys.apiBase(), "group-cover"],
} as const;
