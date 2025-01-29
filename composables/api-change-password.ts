import type { ChangePasswordRequest } from "~/shared/types/change-password-request";

export const useApiChangePassword = () => {
    const { mutate: changePassword, mutateAsync: changePasswordAsync } =
        useMutation({
            mutationFn: async (body: ChangePasswordRequest) =>
                $fetch("/api/change-password", {
                    method: "post",
                    body,
                }),
        });

    return { changePassword, changePasswordAsync };
};
