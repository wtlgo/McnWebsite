import { inArray, ne } from "drizzle-orm";
import { toAsyncBatcher } from "~/shared/utils/async-batch-processor";
import { willsonScore } from "~/shared/utils/willson-score";

const getScores = async (vkIds: number[]) => {
    const db = useMysqlDb();
    const { mcnsPopularityVoteLog: log } = mysqlTables;

    const cleanIds = [...new Set(vkIds)].filter((id) => !isNaN(id));

    const scores = await db
        .select({
            id: log.toId,
            n: sql<number>`count(case when ${log.vote} <> 0 then 1 else 0 end)`,
            k: sql<number>`sum(case when ${log.vote} = 1 then 1 else 0 end)`,
        })
        .from(log)
        .where(and(ne(log.vote, 0), inArray(log.toId, cleanIds)))
        .groupBy(log.toId)
        .then((v) => v.map(({ id, k, n }) => [id, willsonScore(k, n)] as const))
        .then((v) => new Map(v));

    return vkIds.map((id) => scores.get(id) ?? 0);
};

const getVotes = async (index: { from: number; to: number }[]) => {
    const db = useMysqlDb();
    const { mcnsPopularityVoteLog: log } = mysqlTables;

    const conditions = index.map(({ from, to }) =>
        and(eq(log.fromId, from), eq(log.toId, to))
    );

    const votes = await db
        .select()
        .from(log)
        .where(or(...conditions));

    return index.map(
        ({ from, to }) =>
            votes.find((v) => v.fromId === from && v.toId === to)?.vote ?? 0
    );
};

const getVotedForID = async (id: number) => {
    const db = useMysqlDb();
    const { mcnsPopularityVoteLog: log } = mysqlTables;

    const votes = await db
        .select()
        .from(log)
        .where(and(eq(log.toId, id), eq(log.vote, 1)));

    return [...new Set(votes.map((v) => v.fromId))];
};

const scoresBatcher = toAsyncBatcher(getScores);
const scoresName = "get-popular-score" as const;

export const getScore = defineCachedFunction(
    async (vkId: number) => scoresBatcher.enqueue(vkId),
    {
        maxAge: 60 * 60 * 24,
        name: scoresName,
        getKey: (vkId) => vkId.toString(),
    }
);

export const invalidateScore = async (vkId: number) =>
    useStorage("cache").removeItem(
        `nitro:functions:${scoresName}:${vkId}.json`
    );

const votedForName = "get-popular-voted-for" as const;

export const getVotedFor = defineCachedFunction(
    async (id: number) => getVotedForID(id),
    {
        maxAge: 60 * 60 * 24,
        name: votedForName,
        getKey: (vkId) => vkId.toString(),
    }
);

export const invalidateVotedFor = async (vkId: number) =>
    useStorage("cache").removeItem(
        `nitro:functions:${votedForName}:${vkId}.json`
    );

const votesBatcher = toAsyncBatcher(getVotes);
const votesName = "get-popular-votes" as const;
const votesKey = (from: number, to: number) => `${from}-${to}`;

export const getVote = defineCachedFunction(
    async (from: number, to: number) => votesBatcher.enqueue({ from, to }),
    { maxAge: 60 * 60 * 24, name: votesName, getKey: votesKey }
);

export const invalidateVote = async (from: number, to: number) =>
    useStorage("cache").removeItem(
        `nitro:functions:${votesName}:${votesKey(from, to)}.json`
    );

export const voteFor = async (from: number, to: number, vote: -1 | 0 | 1) => {
    const db = useMysqlDb();
    const { mcnsPopularityVoteLog: log } = mysqlTables;

    await Promise.all([
        db
            .insert(log)
            .values({ fromId: from, toId: to, vote })
            .onDuplicateKeyUpdate({ set: { vote } }),
        invalidateVotedFor(to),
        invalidateVote(from, to),
        invalidateScore(to),
    ]);
};
