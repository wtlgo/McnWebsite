export const useMemberGuard = () => {
    const { auth } = useAuthData();
    const isValid = computed(() => auth.value.valid && auth.value.isMember);
    usePathGuard(isValid, "/");
};
