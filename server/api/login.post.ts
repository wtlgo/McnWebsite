import { z } from "zod";
import { createPayload } from "../auth/create-payload";

const loginSchema = z.object({
    type: z.literal("silent_token"),
    token: z.coerce.string().min(1),
    uuid: z.coerce.string().min(1),
});

export default defineEventHandler<{ body: z.infer<typeof loginSchema> }>(
    async (event) => {
        const { token: silentToken, uuid: silentUuid } =
            await readValidatedZodBody(event, loginSchema);

        const { access_token, user_id, expires_in } =
            await ServiceVkAPI.authExchangeSilentAuthToken(
                silentToken,
                silentUuid
            );

        const payload = await createPayload(access_token, user_id);

        return createJWT(payload, expires_in);
    }
);
