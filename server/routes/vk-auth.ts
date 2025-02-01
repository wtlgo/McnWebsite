import { z } from "zod";
import { createPayload } from "../auth/create-payload";

const loginSchema = z.object({
    type: z.literal("silent_token"),
    token: z.coerce.string().min(1),
    uuid: z.coerce.string().min(1),
});

const querySchema = z.object({
    payload: z.coerce
        .string()
        .transform((val) => loginSchema.parse(JSON.parse(val))),
});

export default defineEventHandler(async (event) => {
    try {
        const {
            payload: { token: silentToken, uuid: silentUuid },
        } = getZodQuery(event, querySchema);

        const { access_token, user_id, expires_in } =
            await ServiceVkAPI.authExchangeSilentAuthToken(
                silentToken,
                silentUuid
            );

        const payload = await createPayload(access_token, user_id);
        const token = await createJWT(payload, expires_in);

        setCookie(event, "auth-data", token, { maxAge: expires_in });
    } catch (_) {
        deleteCookie(event, "auth-data");
    }

    return sendRedirect(event, "/");
});
