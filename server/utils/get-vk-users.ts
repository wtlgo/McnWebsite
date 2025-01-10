import { isNull } from "drizzle-orm";
import { z } from "zod";

export const getVkUsers = async () => {
    const db = useMysqlDb();

    const { mcnpVkBukkitPlayers, mcnpVkVkUsers, premium } = mysqlTables;

    return db
        .select({
            name: mcnpVkBukkitPlayers.name,
            uuid: mcnpVkBukkitPlayers.uuid,
            vkId: mcnpVkVkUsers.vkId,
            premium: premium.premium,
            floodgate: premium.floodgate,
        })
        .from(mcnpVkBukkitPlayers)
        .innerJoin(
            mcnpVkVkUsers,
            eq(mcnpVkBukkitPlayers.vkUserId, mcnpVkVkUsers.id)
        )
        .leftJoin(
            premium,
            or(
                eq(
                    sql`REPLACE(${mcnpVkBukkitPlayers.uuid}, '-', '')`,
                    premium.uuid
                ),
                and(
                    or(isNull(mcnpVkBukkitPlayers.uuid), isNull(premium.uuid)),
                    eq(mcnpVkBukkitPlayers.name, premium.name)
                )
            )
        );
};

export type VkUserItem = Awaited<ReturnType<typeof getVkUsers>>[0];
