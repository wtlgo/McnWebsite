import { inArray } from "drizzle-orm";
import { Batcher } from "inbatches";
import { z } from "zod";

const skinDataSchema = z.object({
    textures: z.object({
        SKIN: z.object({
            url: z.string(),
        }),
    }),
});

const parseSkinData = (data?: string) => {
    if (!data) return null;
    try {
        const decoded = Buffer.from(data, "base64").toString("utf-8");
        const skinDataRaw = JSON.parse(decoded);
        const skinData = skinDataSchema.parse(skinDataRaw);
        return skinData.textures.SKIN.url;
    } catch (_) {
        return null;
    }
};

const getSkinUrlComplex = async (names: string[]) => {
    console.log("Fetching skins for:", names.join(", "));

    const db = useMysqlDb();
    const { mcnpVkBukkitPlayers, srPlayers, srUrlSkins, srPlayerSkins } =
        mysqlTables;

    const uuids = await db
        .select({
            uuid: mcnpVkBukkitPlayers.uuid,
            name: mcnpVkBukkitPlayers.name,
        })
        .from(mcnpVkBukkitPlayers)
        .where(inArray(mcnpVkBukkitPlayers.name, [...new Set(names)]))
        .then(filterKeys("uuid", "name"));

    const players = (
        await db
            .select()
            .from(srPlayers)
            .where(
                inArray(
                    srPlayers.uuid,
                    uuids.map((u) => u.uuid)
                )
            )
    )
        .map((p) => {
            const uuid = uuids.find((u) => u.uuid == p.uuid);
            if (!uuid) return null;
            return { ...p, ...uuid };
        })
        .filter(notNullVal);

    const skinRequestsPromises: Promise<
        {
            name: string;
            value: string | null;
        }[]
    >[] = [];

    const uPlayers = players
        .filter((p) => p.skinType === "URL")
        .filter(notNullKeys("skinIdentifier"));
    if (uPlayers.length) {
        skinRequestsPromises.push(
            db
                .select()
                .from(srUrlSkins)
                .where(
                    inArray(
                        srUrlSkins.url,
                        uPlayers.map((p) => p.skinIdentifier)
                    )
                )
                .then((skins) =>
                    skins
                        .map((s) => {
                            const player = uPlayers.find(
                                (p) => p.skinIdentifier === s.url
                            );
                            if (!player) return null;
                            return {
                                name: player.name,
                                value: parseSkinData(s.value),
                            };
                        })
                        .filter(notNullVal)
                )
        );
    }

    const pPlayers = players.filter((p) => p.skinType === "PLAYER");
    if (pPlayers.length) {
        skinRequestsPromises.push(
            db
                .select()
                .from(srPlayerSkins)
                .where(
                    inArray(
                        srPlayerSkins.uuid,
                        pPlayers.map((p) => p.skinIdentifier ?? p.uuid)
                    )
                )
                .then((skins) =>
                    skins
                        .map((s) => {
                            const player = pPlayers.find(
                                (p) => p.skinIdentifier ?? p.uuid === s.uuid
                            );
                            if (!player) return null;
                            return {
                                name: player.name,
                                value: parseSkinData(s.value),
                            };
                        })
                        .filter(notNullVal)
                )
        );
    }

    const nPlayers = players.filter((p) => p.skinType === null);
    if (nPlayers.length) {
        skinRequestsPromises.push(
            db
                .select()
                .from(srPlayerSkins)
                .where(
                    inArray(
                        srPlayerSkins.uuid,
                        nPlayers.map((p) => p.uuid)
                    )
                )
                .then((skins) =>
                    skins
                        .map((s) => {
                            const player = nPlayers.find(
                                (p) => p.uuid === s.uuid
                            );
                            if (!player) return null;
                            return {
                                name: player.name,
                                value: parseSkinData(s.value),
                            };
                        })
                        .filter(notNullVal)
                )
        );
    }

    const skins = (await Promise.all(skinRequestsPromises))
        .flatMap((a) => a)
        .reduce(
            (acc, val) => (val.value ? { ...acc, [val.name]: val.value } : acc),
            {} as Record<string, string>
        );

    const notFoundSkins = names.filter((n) => !(n in skins));
    const lastAttempt = await db
        .select()
        .from(srPlayerSkins)
        .where(inArray(srPlayerSkins.lastKnownName, notFoundSkins))
        .then((skins) =>
            skins
                .map((s) => ({
                    name: s.lastKnownName,
                    value: parseSkinData(s.value),
                }))
                .filter(notNullKeys("name", "value"))
                .reduce(
                    (acc, val) =>
                        val.value ? { ...acc, [val.name]: val.value } : acc,
                    {} as Record<string, string>
                )
        );

    const totalResult = { ...skins, ...lastAttempt };

    return names.map((name) => (totalResult[name] ?? null) as string | null);
};

class SkinBatcher extends Batcher<string, string | null> {
    public constructor() {
        super();
    }

    async run(names: string[]) {
        return getSkinUrlComplex(names);
    }
}
const batcher = new SkinBatcher();

export const getSkinUrl = async (name: string) => batcher.enqueue(name);
