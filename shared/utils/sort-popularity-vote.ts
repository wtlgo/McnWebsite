import type { PopularityVoteData } from "../types/popularity-vote-data";
import { stableSort } from "./stable-sort";

type VoteData = Omit<PopularityVoteData, "place">;
export const sortPopularityVote = (voteData: VoteData[]) => {
    const scorePlaces = [...new Set(voteData.map((vd) => vd.score))]
        .sort()
        .reverse()
        .map((score, place) => [score, place + 1] as const);

    return stableSort(
        voteData.map(
            (vd): PopularityVoteData => ({
                ...vd,
                place:
                    scorePlaces.find(([score]) => score === vd.score)?.at(1) ??
                    scorePlaces.length + 1,
            })
        ),
        "score",
        false
    );
};
