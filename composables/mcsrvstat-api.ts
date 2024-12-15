import { z } from "zod";

const mcSrvStatSchema = z.object({
    online: z.coerce.boolean(),
    players: z.object({
        online: z.coerce.number(),
        max: z.coerce.number(),
    }),
    icon: z.coerce.string(),
});

export const useMcsrvstatApi = (ip: TValue<string>) => {
    const { suspense, ...other } = useQuery({
        queryKey: queryKeys.mcSrvStatApi(ip),
        queryFn: async ({ signal }) =>
            $fetch(`https://api.mcsrvstat.us/3/${toValue(ip)}`, {
                signal,
            }).then((res) => mcSrvStatSchema.parseAsync(res)),
    });

    onServerPrefetch(async () => {
        await suspense();
    });

    return { suspense, ...other };
};
