import { z } from "zod";
import { canVkAuth } from "~/shared/utils/abilities.ts";
import { createPayload } from "../auth/create-payload";

const vkResponseSchema = z
    .object({
        code: z.string(),
        expires_in: z.coerce.number(),
        device_id: z.string(),
        state: z.string(),
        type: z.literal("code_v2"),
    })
    .catchall(z.unknown());

const authResponseSchemaError = z.object({
    error: z.string(),
    error_description: z.string(),
});

const authResponseSchemaSuccess = z.object({
    refresh_token: z.string(),
    access_token: z.string(),
    id_token: z.string(),
    token_type: z.string(),
    expires_in: z.number(),
    user_id: z.number(),
    state: z.string(),
    scope: z.string(),
});

const authResponseSchema = z.union([
    authResponseSchemaError,
    authResponseSchemaSuccess,
]);

export default defineEventHandler(async (event) => {
    await authorize(event, canVkAuth);
    const { code, device_id } = getZodQuery(event, vkResponseSchema);

    const auth = await $fetch("https://id.vk.com/oauth2/auth", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "authorization_code",
            client_id: useRuntimeConfig().public.vkApiClientId,
            redirect_uri: "https://mikchan.net/vk-auth",
            code_verifier: getCookie(event, "pkce-code-verifier") ?? "",
            code,
            device_id,
        }).toString(),
    })
        .then(authResponseSchema.parse)
        .catch(
            (error: unknown): z.infer<typeof authResponseSchemaError> => ({
                error: "Error",
                error_description: `${error}`,
            })
        );

    try {
        if ("error" in auth) {
            throw auth;
        }

        const { access_token, user_id, expires_in } = auth;
        const payload = await createPayload(access_token, user_id);
        const token = await createJWT(payload, expires_in);
        setCookie(event, "auth-data", token, { maxAge: expires_in });

        return sendRedirect(event, "/");
    } catch (error) {
        deleteCookie(event, "auth-data");
        console.error(error);
        throw createError({
            statusCode: 500,
            statusMessage: "Попытка входа не удалась",
        });
    }
});
