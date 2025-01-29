import { canPopularityVote } from "~/shared/utils/abilities.ts";
import { getVotedFor } from "../utils/popularity-vote";
import { getValidUser } from "../utils/get-user";

export default defineEventHandler(async (event) => {
    await authorize(event, canPopularityVote);
    const { id } = await getValidUser(event);
    return getVotedFor(id);
});
