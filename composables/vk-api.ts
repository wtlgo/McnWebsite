export const useVkApi = createGlobalState(() => {
    const user = useUser();
    return computed(() => new VkApiJsonP(user.value?.accessToken ?? ""));
});
