import { canViewProfiles } from "~/shared/utils/abilities.ts";
import { getValidUser } from "../utils/get-user";

export default defineEventHandler(async (event) => {
    await authorize(event, canViewProfiles);
    const { id } = await getValidUser(event);

    const players = await getVkUsers();
    const thisPlayer = players.filter((p) => p.vkId === id);

    return thisPlayer;
});
