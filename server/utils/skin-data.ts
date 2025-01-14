import { z } from "zod";

const skinDataSchema = z.object({
    textures: z.object({
        SKIN: z.object({
            url: z.string(),
        }),
    }),
});

const parseSkinData = (data: string) => {
    try {
        const decoded = Buffer.from(data, "base64").toString("utf-8");
        const skinDataRaw = JSON.parse(decoded);
        const skinData = skinDataSchema.parse(skinDataRaw);
        return skinData.textures.SKIN.url;
    } catch (_) {
        return null;
    }
};

const getSkinUrlComplex = async (name: string) => {
    const db = useMysqlDb();
    const { mcnpVkBukkitPlayers, srPlayers, srUrlSkins, srPlayerSkins } =
        mysqlTables;

    const uuid = await db
        .select({ uuid: mcnpVkBukkitPlayers.uuid })
        .from(mcnpVkBukkitPlayers)
        .where(eq(mcnpVkBukkitPlayers.name, name))
        .then((v) => v[0]?.uuid);
    if (!uuid) return null;

    const player = await db
        .select()
        .from(srPlayers)
        .where(eq(srPlayers.uuid, uuid))
        .then((v) => v[0]);
    if (!player) return null;

    switch (player.skinType) {
        case "URL": {
            const skin = await db
                .select()
                .from(srUrlSkins)
                .where(eq(srUrlSkins.url, player.skinIdentifier ?? "-"))
                .then((v) => v[0]);
            return parseSkinData(skin.value);
        }

        case "PLAYER": {
            const skin = await db
                .select()
                .from(srPlayerSkins)
                .where(eq(srPlayerSkins.uuid, player.skinIdentifier ?? uuid))
                .then((v) => v[0]);
            return parseSkinData(skin.value);
        }

        case null: {
            const skin = await db
                .select()
                .from(srPlayerSkins)
                .where(eq(srPlayerSkins.uuid, player.uuid))
                .then((v) => v[0]);
            return parseSkinData(skin.value);
        }

        default: {
            return null;
        }
    }
};

export const getSkinUrl = async (name: string) => {
    const complexUrl = await getSkinUrlComplex(name);
    if (complexUrl) return complexUrl;

    const db = useMysqlDb();
    const { srPlayerSkins } = mysqlTables;
    return db
        .select()
        .from(srPlayerSkins)
        .where(eq(srPlayerSkins.lastKnownName, name))
        .then((v) => v[0])
        .then((v) => (v ? parseSkinData(v.value) : null));
};
