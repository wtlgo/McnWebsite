import { z } from "zod";
import { popularityVoteSchema } from "~/shared/types/popularity-vote-data";
import { sortPopularityVote } from "~/shared/utils/sort-popularity-vote";

export const useApiScore = () => {
    const user = useUser();
    const fetch = useRequestFetch();
    const queryClient = useQueryClient();
    const { mutate: refetchMyScore } = useMutation({
        mutationFn: async () => {
            const id = user.value?.id;
            if (!id) return null;
            return fetch("/api/score", { params: { id, force: 1 } });
        },

        onSuccess(score) {
            if (!score) return;
            const id = user.value?.id;
            if (!id) return null;

            queryClient.setQueryData(
                queryKeys.apiPopularityVote(),
                (oldData: unknown) => {
                    const data = z
                        .array(popularityVoteSchema)
                        .safeParse(oldData);
                    if (!data.success) return oldData;

                    return sortPopularityVote(
                        data.data.map((vd) =>
                            vd.id === id ? { ...vd, score } : vd
                        )
                    );
                }
            );
        },
    });

    return { refetchMyScore };
};
