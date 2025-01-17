import { jwtVerify, SignJWT } from "jose";
import { z } from "zod";
import { alg, audience, issuer, secret } from "~/server/auth/config";
import { payloadSchema as jwtSchema } from "~/shared/types/payload";

export const createJWT = async (
    payload: z.infer<typeof jwtSchema>,
    expiresIn: number
) =>
    new SignJWT(payload)
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setIssuer(issuer)
        .setAudience(audience)
        .setExpirationTime(new Date(Date.now() + expiresIn * 1000))
        .sign(secret);

const validateJWTInner = async (token?: string | null) => {
    if (!token) return null;
    try {
        const { payload } = await jwtVerify(token, secret, {
            issuer,
            audience,
        });

        return await jwtSchema.parseAsync(payload);
    } catch (err) {
        console.error(err);
        return null;
    }
};

export const validateJWT = async (token?: string | null) => {
    const res = await validateJWTInner(token);
    if (res === null) {
        throw createError({
            statusCode: 403,
            message: "Не валидный токен",
        });
    }
    return res;
};
