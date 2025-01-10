export const queryKeys = {
    mcSrvStatApi: (ip: unknown) => ["api", "mcsrvstat", ip],

    apiBase: () => ["api", "client"],
    apiGroupCover: () => [...queryKeys.apiBase(), "group-cover"],
    apiPlayerList: () => [...queryKeys.apiBase(), "player-list"],
    apiProfiles: () => [...queryKeys.apiBase(), "profiles"],

    apiVk: () => ["api", "vk"],
    apiVkUserGet: (id: unknown) => [...queryKeys.apiVk(), "user", "get", id],
} as const;
