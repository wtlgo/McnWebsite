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

const batcher = new SkinBatcher();

export const useApiSkin = (
    name: TValue<string>,
    enabled: TValue<boolean> = true
) => {
    const { token, auth } = useAuthData();

    watchEffect(() => {
        batcher._token = token.value;
    });

    const { data } = useQuery({
        queryKey: queryKeys.apiSkin(name),
        queryFn: async () => {
            return batcher.enqueue(toValue(name));
        },
        enabled: () =>
            !!token.value &&
            auth.value.valid &&
            auth.value.isMember &&
            toValue(enabled),
    });

    const safeSkin = computed(
        () => data.value?.replace("http://", "https://") ?? null
    );

    return safeSkin;
};
