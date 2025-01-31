import { AsyncBatchProcessor } from "~/shared/utils/async-batch-processor";

class SkinBatcher extends AsyncBatchProcessor<string, string | null> {
    public _fetch: typeof $fetch = $fetch;

    public constructor() {
        super();
    }

    async run(names: string[]) {
        return this._fetch("/api/skin", {
            query: { name: names.join(",") },
        });
    }
}

export const useSkinBatcher = createGlobalState(() => {
    const batcher = shallowRef(new SkinBatcher());

    const requestFetch = useRequestFetch();
    watchEffect(() => {
        batcher.value._fetch = requestFetch;
    });

    const enqueue = async (name: string, signal?: AbortSignal) =>
        batcher.value.enqueue(name, signal);

    return { enqueue };
});
