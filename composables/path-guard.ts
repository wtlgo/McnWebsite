import type { RouteLocationRaw } from "vue-router";

export const usePathGuard = (
    isValid: TValue<boolean>,
    path: RouteLocationRaw
) => {
    const router = useRouter();
    watchEffect(() => {
        if (toValue(isValid)) return;
        router.push(path);
    });
};
