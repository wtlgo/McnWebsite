import { H3Event } from "h3";

export const getAccessToken = <Event extends H3Event>(event: Event) => {
    const accessToken = event.node.req.headers.authorization;
    if (!accessToken) return null;

    const parts = accessToken.split(" ");
    if (parts.length != 2) return null;
    if (parts[0] !== "Bearer") return null;

    return parts[1];
};
