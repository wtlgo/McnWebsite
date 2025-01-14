export const queryKeys = {
    mcSrvStatApi: (ip: unknown) => ["api", "mcsrvstat", ip],

    apiBase: () => ["api", "client"],
    apiGroupCover: () => [...queryKeys.apiBase(), "group-cover"],
    apiPlayerList: () => [...queryKeys.apiBase(), "player-list"],
    apiProfiles: () => [...queryKeys.apiBase(), "profiles"],
    apiSkin: (name: unknown) => [...queryKeys.apiBase(), "skin", name],

    apiVk: () => ["api", "vk"],
    apiVkUserGet: (id: unknown) => [...queryKeys.apiVk(), "user", "get", id],

    local: () => ["local"],
    localSkinHead: (url: unknown, size: unknown) => [
        ...queryKeys.local(),
        "skin-head",
        url,
        size,
    ],
} as const;
