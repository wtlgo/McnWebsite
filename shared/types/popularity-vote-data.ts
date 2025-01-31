import { z } from "zod";

export const popularityVoteSchema = z.object({
    id: z.number(),
    score: z.number(),
    place: z.number(),
    usernames: z.array(z.string()),
});

export type PopularityVoteData = z.infer<typeof popularityVoteSchema>;
