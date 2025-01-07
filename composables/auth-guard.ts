export const useAuthGuard = () => {
    const { auth } = useAuthData();
    const isValid = computed(() => auth.value.valid);
    usePathGuard(isValid, "/");
};
