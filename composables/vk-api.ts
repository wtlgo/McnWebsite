export const useVkApi = () => {
    const { auth } = useAuthData();
    return computed(
        () => new VkApiJsonP(auth.value.valid ? auth.value.accessToken : "")
    );
};
