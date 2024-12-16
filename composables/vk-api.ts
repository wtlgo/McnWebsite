export const useVkApi = () => {
    const runtimeConfig = useRuntimeConfig();
    return computed(() => new VkApiJsonP(runtimeConfig.vkApiServiceKey));
};
