import { z } from "zod";
import { canFetchMojangSkin } from "~/shared/utils/abilities.ts";

const querySchema = z.object({
    name: z.string().min(1),
});

const step1 = z
    .object({
        id: z.string(),
    })
    .transform((d) => d.id);

const step2 = z
    .object({
        properties: z.array(
            z.object({
                name: z.string().optional(),
                value: z.string().optional(),
            })
        ),
    })
    .transform(
        (d) =>
            JSON.parse(
                Buffer.from(
                    d.properties.find((p) => p.name === "textures")?.value ??
                        "",
                    "base64"
                ).toString()
            ) as unknown
    );

const step3 = z
    .object({
        textures: z.record(
            z.string(),
            z.object({ url: z.string().optional() })
        ),
    })
    .transform((d) => d.textures["SKIN"]?.url);

const getMinecraftSkin = cachedFunction(
    async (username?: string | null) => {
        if (!username) return null;

        try {
            const id = await $fetch(
                `https://api.mojang.com/users/profiles/minecraft/${username}`
            ).then(step1.parseAsync);

            const texture = await $fetch(
                `https://sessionserver.mojang.com/session/minecraft/profile/${id}`
            ).then(step2.parseAsync);

            const url = await step3.parseAsync(texture);

            return url?.replace("http://", "https://") ?? null;
        } catch (err) {
            console.error(err);
            return null;
        }
    },
    {
        name: "get-minecraft-skin",
        maxAge: 24 * 60 * 60,
    }
);

export default defineEventHandler(async (event) => {
    await authorize(event, canFetchMojangSkin);
    let { name: username } = getZodQuery(event, querySchema);
    return getMinecraftSkin(username?.trim());
});
