import { ne } from "drizzle-orm";
import { toAsyncBatcher } from "~/shared/utils/async-batch-processor";
import { willsonScore } from "~/shared/utils/willson-score";

const getScores = async (vkIds: number[]) => {
    const db = useMysqlDb();
    const { mcnsPopularityVoteLog: log } = mysqlTables;

    const scores = await db
        .select({
            id: log.toId,
            n: sql<number>`count(*)`,
            k: sql<number>`sum(case when ${log.vote} = 1 then 1 else 0 end)`,
        })
        .from(log)
        .where(ne(log.vote, 0))
        .groupBy(log.toId)
        .then((v) => v.map(({ id, k, n }) => [id, willsonScore(k, n)] as const))
        .then((v) => new Map(v));

    return vkIds.map((id) => scores.get(id) ?? 0);
};

const batcher = toAsyncBatcher(getScores);
const functionName = "get-popular-score" as const;

export const getScore = defineCachedFunction(
    async (vkId: number) => batcher.enqueue(vkId),
    {
        maxAge: 60 * 60 * 24,
        name: functionName,
        getKey: (vkId) => vkId.toString(),
    }
);

export const invalidateScore = async (vkId: number) =>
    useStorage("cache").removeItem(
        `nitro:functions:${functionName}:${vkId}.json`
    );
