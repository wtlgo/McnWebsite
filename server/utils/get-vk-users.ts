export const getVkUsers = async () => {
    const db = useMysqlDb();

    const { mcnpVkBukkitPlayers, mcnpVkVkUsers } = mysqlTables;

    return db
        .select({
            name: mcnpVkBukkitPlayers.name,
            uuid: mcnpVkBukkitPlayers.uuid,
            vkId: mcnpVkVkUsers.vkId,
        })
        .from(mcnpVkBukkitPlayers)
        .innerJoin(
            mcnpVkVkUsers,
            eq(mcnpVkBukkitPlayers.vkUserId, mcnpVkVkUsers.id)
        );
};
