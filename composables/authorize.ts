export const useAuthorize = (
    bouncer: unknown,
    ...wrappedArgs: TValue<unknown>[]
) => {
    const user = useUser();
    watchEffect(async () => {
        user.value;
        try {
            await authorize(bouncer as any, ...wrappedArgs.map(toValue));
        } catch (err) {
            console.error(err);
            showError({ status: 403, statusMessage: "Нет доступа" });
        }
    });
};
