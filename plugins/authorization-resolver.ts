import { type TPayload } from "~/shared/types/payload";

export default defineNuxtPlugin({
    name: "authorization-resolver",
    parallel: true,
    setup: () => ({
        provide: {
            authorization: {
                resolveClientUser: (): TPayload | null => useUser().value,
            },
        },
    }),
});
