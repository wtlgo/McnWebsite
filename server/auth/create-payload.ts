import { TPayload } from "~/server/auth/payload";

export const createPayload = async (accessToken: string, vkId: number) => {
    const vkApi = new VkApiFetch(accessToken);

    const vkUsers = await vkApi.userGet({});
    const user = vkUsers[0];

    if (!user || user.id != vkId) {
        throw createError({
            statusCode: 400,
            message:
                "Пользователь не состоит в группе https://vk.com/mikchanno",
        });
    }

    const groups = await vkApi.groupsGetById({ groupIds: [197680365] });
    const group = groups.find((g) => g.id == 197680365);
    if (!group || !group.is_member) {
        throw createError({
            statusCode: 400,
            message:
                "Пользователь не состоит в группе https://vk.com/mikchanno",
        });
    }

    const payload: TPayload = {
        id: user.id,
        name: user.first_name,
        surname: user.last_name,
        photo: user.photo_400,
        accessToken,
        isAdmin: group.is_admin,
    };

    return payload;
};
