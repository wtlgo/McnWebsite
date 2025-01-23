import { AsyncBatchProcessor } from "~/shared/utils/async-batch-processor";

class SkinBatcher extends AsyncBatchProcessor<string, string | null> {
    public _token: string | null = null;
    public constructor() {
        super();
    }

    async run(names: string[]) {
        if (this._token === null) {
            return names.map(() => null);
        }

        return $fetch("/api/skin", {
            query: { name: names.join(",") },
            headers: {
                ...toBearerHeader(this._token),
            },
        });
    }
}

export const useSkinBatcher = createGlobalState(() => {
    const batcher = shallowRef(new SkinBatcher());
    const token = useToken();
    watchEffect(() => {
        batcher.value._token = token.value;
    });

    const enqueue = async (name: string, signal?: AbortSignal) =>
        batcher.value.enqueue(name, signal);

    return { enqueue };
});
