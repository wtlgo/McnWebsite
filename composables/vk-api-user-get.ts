import { useSessionStorage } from "@vueuse/core";
import type { z } from "zod";
import { userResponseSchema } from "~/shared/vk/types";

export const useVkApiUserGet = (
    id: TValue<number>,
    enabled: TValue<boolean> = true
) => {
    const cache = useSessionStorage<z.infer<typeof userResponseSchema>>(
        "vk-api-user-get-cache",
        []
    );

    const vkApi = useVkApi();

    const { data } = useQuery({
        queryKey: queryKeys.apiVkUserGet(id),
        queryFn: async ({ signal }) => {
            const vid = toValue(id);
            const user = cache.value.find((u) => u.id === vid);
            if (user) return user;

            const additionalUsers = await vkApi.value.userGet(
                { userIds: [vid] },
                signal
            );
            cache.value = [...cache.value, ...additionalUsers];
            return additionalUsers.find((u) => u.id === vid);
        },
        enabled: () => toValue(enabled) && import.meta.client,
        gcTime: Infinity,
        staleTime: Infinity,
    });

    return data;
};
