import { TPayload } from "~/shared/types/payload";

export const createPayload = async (accessToken: string, vkId: number) => {
    const vkApi = new VkApiFetch(accessToken);

    const vkUsers = await vkApi.userGet({});
    const user = vkUsers[0];

    if (!user || user.id != vkId) {
        throw createError({
            statusCode: 404,
            message: "Пользователь не найден",
        });
    }

    const groups = await vkApi.groupsGetById({ groupIds: [197680365] });
    const group = groups.find((g) => g.id == 197680365);
    const isMember = !!group && group.is_member;
    const isAdmin = !!group && group.is_admin;
    const gameTitle = isMember ? await findInGameTitle(vkId) : "Гость";

    const payload: TPayload = {
        id: user.id,
        name: user.first_name,
        surname: user.last_name,
        photo: user.photo_400,
        accessToken,
        isAdmin,
        isMember,
        gameTitle,
    };

    return payload;
};
