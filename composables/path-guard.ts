import type { RouteLocationRaw } from "vue-router";

export const usePathGuard = (
    isValid: TValue<boolean>,
    path: RouteLocationRaw
) => {
    watchEffect(() => {
        if (toValue(isValid)) return;
        throw createError({ statusCode: 401, statusMessage: 'Нет доступа' });
    });
};
