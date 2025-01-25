import { z } from "zod";
import isUrl from "is-url-superb";

const changeSkinSchema = z.object({
    name: z.string(),
    url: z.string().refine((s) => isUrl(s)),
});

export default defineEventHandler<{ body: z.infer<typeof changeSkinSchema> }>(
    async (event) => {
        const { isMember, id } = await validateJWT(getAccessToken(event));
        if (!isMember) {
            throw createError({ statusCode: 403, message: "Нет доступа" });
        }

        const { name, url } = await readValidatedZodBody(
            event,
            changeSkinSchema
        );

        const players = await getVkUsers();
        const uuid = players.find(
            (p) => p.vkId === id && p.name === name
        )?.uuid;
        if (!uuid) {
            throw createError({
                statusCode: 403,
                message: "Не найден соответсвующий UUID",
            });
        }

        const skin = await getMineskinData(url);
        if (!skin) {
            throw createError({
                statusCode: 500,
                message: "Не удалось обработать скин",
            });
        }

        const db = useMysqlDb();
        const { srPlayers } = mysqlTables;

        await db
            .insert(srPlayers)
            .values({
                uuid,
                skinIdentifier: skin.url,
                skinType: "URL",
                skinVariant: skin.variant,
            })
            .onDuplicateKeyUpdate({
                set: {
                    skinIdentifier: skin.url,
                    skinType: "URL",
                    skinVariant: skin.variant,
                },
            });

        invalidateSkinUrl(name);

        return skin.url;
    }
);
