import { z } from "zod";
import { canPopularityVote } from "~/shared/utils/abilities.ts";
import { getValidUser } from "../utils/get-user";

const voteSchema = z.object({
    to: z.number(),
    vote: z.union([z.literal(-1), z.literal(0), z.literal(1)]),
});

export default defineEventHandler<{ body: z.infer<typeof voteSchema> }>(
    async (event) => {
        await authorize(event, canPopularityVote);
        const { id } = await getValidUser(event);

        const { to, vote } = await readValidatedZodBody(event, voteSchema);
        await voteFor(id, to, vote);

        return "OK";
    }
);
