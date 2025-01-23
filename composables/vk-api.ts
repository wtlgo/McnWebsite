export const useVkApi = createGlobalState(() => {
    const { auth } = useAuthData();
    return computed(
        () => new VkApiJsonP(auth.value.valid ? auth.value.accessToken : "")
    );
});
