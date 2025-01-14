import { z } from "zod";
import { PlayerListData } from "~/shared/types/player-list-data";

const querySchema = z.object({
    accessToken: z.string().min(1),
});

export default defineEventHandler(async (event) => {
    const { accessToken } = getZodQuery(event, querySchema);
    const { isMember } = await validateJWT(accessToken);
    if (!isMember) {
        throw createError({ statusCode: 403 });
    }

    return (await getVkUsers())
        .map(
            ({ name, vkId, floodgate }): PlayerListData => ({
                name,
                vk: vkId,
                bedrock: !!floodgate,
            })
        )
        .reverse();
});
