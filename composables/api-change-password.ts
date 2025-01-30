import type { ChangePasswordRequest } from "~/shared/types/change-password-request";

export const useApiChangePassword = () => {
    const requestFetch = useRequestFetch();
    const { mutate: changePassword, mutateAsync: changePasswordAsync } =
        useMutation({
            mutationFn: async (body: ChangePasswordRequest) =>
                requestFetch("/api/change-password", {
                    method: "post",
                    body,
                }),
        });

    return { changePassword, changePasswordAsync };
};
