import { inArray, like } from "drizzle-orm";

export const findInGameTitle = async (vkId: number): Promise<string> => {
    const db = useMysqlDb();
    const {
        mcnpVkBukkitPlayers,
        mcnpVkVkUsers,
        luckpermsPlayers,
        luckpermsUserPermissions,
    } = mysqlTables;

    const users = await db
        .select({
            name: mcnpVkBukkitPlayers.name,
            uuid: luckpermsPlayers.uuid,
            vkId: mcnpVkVkUsers.vkId,
        })
        .from(mcnpVkBukkitPlayers)
        .innerJoin(
            mcnpVkVkUsers,
            eq(mcnpVkBukkitPlayers.vkUserId, mcnpVkVkUsers.id)
        )
        .innerJoin(
            luckpermsPlayers,
            eq(luckpermsPlayers.username, mcnpVkBukkitPlayers.name)
        )
        .where(eq(mcnpVkVkUsers.vkId, vkId));

    const uuids = users.map((u) => u.uuid);

    const perms = await db
        .select({
            group: luckpermsUserPermissions.permission,
        })
        .from(luckpermsUserPermissions)
        .where(
            and(
                inArray(luckpermsUserPermissions.uuid, uuids),
                like(luckpermsUserPermissions.permission, "group.%"),
                eq(luckpermsUserPermissions.value, 1)
            )
        );

    const cleanPerms = new Set(perms.map((p) => p.group.slice(6)));

    if (cleanPerms.has("makar"))
        return "верховный ван - сын неба - жёлтый император - хуйанди";
    if (cleanPerms.has("op")) return "Администратор";
    if (cleanPerms.has("moderator")) return "Модератор";
    if (cleanPerms.has("editor")) return "Редатор";
    if (cleanPerms.has("olds")) return "Игрок-олд";
    return "Игрок";
};
