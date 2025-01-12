import { z } from "zod";

export const changePasswordRequestSchema = z.object({
    accessToken: z.string().trim(),
    name: z.string().trim(),
    password1: z.string().trim().min(8, "Пароль слишком короткий"),
    password2: z.string().trim(),
});

export type ChangePasswordRequest = z.infer<typeof changePasswordRequestSchema>;
