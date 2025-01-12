import {
    ChangePasswordRequest,
    changePasswordRequestSchema,
} from "~/shared/types/change-password-request";
import { OkResponse } from "~/shared/types/ok-response";

export default defineEventHandler<{
    body: ChangePasswordRequest;
}>(async (event): Promise<OkResponse> => {
    const { accessToken, name, password1, password2 } =
        await readValidatedZodBody(event, changePasswordRequestSchema);
    const { isMember, id } = await validateJWT(accessToken);
    if (!isMember) {
        throw createError({ statusCode: 403, message: "Нет доступа" });
    }

    const users = await getVkUsers();
    const thisUser = users.find(
        (u) => u.vkId === id && u.name.toLowerCase() === name.toLowerCase()
    );
    if (!thisUser) {
        throw createError({ statusCode: 403, message: "Нет доступа" });
    }

    if (password1 !== password2) {
        throw createError({
            statusCode: 400,
            statusMessage: "Пароли не совпадают",
        });
    }

    const db = useMysqlDb();
    const { authme } = mysqlTables;
    const authmeUsers = await db
        .select({
            id: authme.id,
            name: authme.username,
        })
        .from(authme)
        .where(eq(authme.username, name));
    const authmeUser = authmeUsers[0];
    if (!authmeUser) {
        throw createError({
            statusCode: 404,
            message: "Пользователь с таким ником не найден",
        });
    }

    const passwordHash = await authmePasswordHash(password1);

    await db
        .update(authme)
        .set({ password: passwordHash })
        .where(eq(authme.id, authmeUser.id));

    return "OK";
});
