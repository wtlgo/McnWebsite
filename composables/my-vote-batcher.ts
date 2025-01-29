import { AsyncBatchProcessor } from "~/shared/utils/async-batch-processor";

class MyVoteBatcher extends AsyncBatchProcessor<number, number> {
    public _token: string | null = null;
    public _fromId: number | null = null;
    public constructor() {
        super();
    }

    async run(ids: number[]) {
        if (this._token === null || this._fromId === null) {
            return ids.map(() => 0);
        }

        return $fetch("/api/popularity-vote-my-vote", {
            query: { from: this._fromId, to: ids.join(",") },
            headers: {
                ...toBearerHeader(this._token),
            },
        });
    }
}

export const useMyVoteBatcher = createGlobalState(() => {
    const batcher = shallowRef(new MyVoteBatcher());

    const token = useToken();
    watchEffect(() => {
        batcher.value._token = token.value;
    });

    const user = useUser();
    const fromId = computed(() => user.value?.id ?? null);

    watchEffect(() => {
        batcher.value._token = token.value;
        batcher.value._fromId = fromId.value;
    });

    const enqueue = async (id: number, signal?: AbortSignal) =>
        batcher.value.enqueue(id, signal);

    return { enqueue, fromId };
});
