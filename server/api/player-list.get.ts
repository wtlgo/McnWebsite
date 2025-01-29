import { PlayerListData } from "~/shared/types/player-list-data";
import { canViewPlayerList } from "~/shared/utils/abilities.ts";

const getUsersCached = cachedFunction(
    async () =>
        (await getVkUsers())
            .map(
                ({ name, vkId, floodgate, uuid }): PlayerListData => ({
                    name,
                    uuid,
                    vk: vkId,
                    bedrock: !!floodgate,
                })
            )
            .reverse(),
    { maxAge: 60 * 5, name: "get-users-cached" }
);

export default defineEventHandler(async (event) => {
    await authorize(event, canViewPlayerList);
    return getUsersCached().then((v) => v ?? []);
});
