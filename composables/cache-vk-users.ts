import type { z } from "zod";
import type { userResponseSchema } from "~/shared/vk/types";

type TUser = z.infer<typeof userResponseSchema>[0];
const cacheKey = "vk-api-user-get-cache";

export const useCacheVkUsers = () => {
    const cache = useSessionStorage<TUser[]>(cacheKey, []);

    const readonlyCache = readonly(cache);
    const find = (id: number) =>
        readonlyCache.value.find((u) => u.id === id) ?? null;
    const add = (values: TUser[]) =>
        (cache.value = [...cache.value, ...values]);

    return {
        cache: readonlyCache,
        find,
        add,
    };
};
