import { getJWTData } from "./jwt";
import { H3Event } from "h3";

export const getUser = <Event extends H3Event = H3Event>(event: Event) =>
    getJWTData(getCookie(event, "auth-data") ?? getAccessToken(event));

export const getValidUser = async <Event extends H3Event = H3Event>(
    event: Event
) => {
    const user = await getUser(event);
    if (!user)
        throw createError({
            statusCode: 403,
            message: "Нет доступа",
        });
    return user;
};
