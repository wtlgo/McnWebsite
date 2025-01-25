import { z } from "zod";

export interface SkinInfo {
    url: string;
    id: string | null;
    variant: string | null;
    value: string;
    signature: string;
}

const mineskinResponseSchema = z.object({
    success: z.literal(true),
    skin: z.object({
        uuid: z.string(),
        variant: z
            .string()
            .default("classic")
            .transform((v) => v.toUpperCase()),
        texture: z.object({
            data: z.object({
                value: z.string(),
                signature: z.string(),
            }),
        }),
    }),
});

const getMineskinDataRemote = (url: string) =>
    $fetch("https://api.mineskin.org/v2/generate", {
        method: "post",
        headers: {
            "User-Agent": "MCNS/1.0",
            Authorization: `Bearer ${useRuntimeConfig().mineskinKey}`,
        },
        body: {
            url,
        },
    })
        .then(mineskinResponseSchema.parseAsync)
        .then(
            (v): SkinInfo => ({
                url,
                id: v.skin.uuid,
                variant: v.skin.variant,
                ...v.skin.texture.data,
            })
        )
        .catch(() => null);

export const getMineskinData = async (url: string) => {
    const db = useMysqlDb();
    const { srUrlSkins, srUrlIndex } = mysqlTables;

    const existingSkin = await db
        .select()
        .from(srUrlSkins)
        .where(eq(srUrlSkins.url, url))
        .then((v) => v[0] ?? null)
        .then((v): SkinInfo | null =>
            v
                ? {
                      url,
                      id: v.mineSkinId,
                      variant: v.skinVariant,
                      value: v.value,
                      signature: v.signature,
                  }
                : null
        );
    if (existingSkin) return existingSkin;

    const newSkin = await getMineskinDataRemote(url);
    if (!newSkin) return null;
    await Promise.all([
        db
            .insert(srUrlIndex)
            .values({ url, skinVariant: newSkin.variant })
            .onDuplicateKeyUpdate({ set: { skinVariant: newSkin.variant } }),
        db.insert(srUrlSkins).values({
            url,
            mineSkinId: newSkin.id,
            value: newSkin.value,
            signature: newSkin.signature,
            skinVariant: newSkin.variant,
        }),
    ]);

    return newSkin;
};
