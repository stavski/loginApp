import { z } from "zod";

export const updateUserPasswordSchema = {
    params: z.object({
        id: z.coerce.number(),
    }),
    body: z.object({
        currentPassword: z.string().min(6),
        newPassword: z.string().min(6),
        passwordConfirmation: z.string().min(6),
    }).refine((data) => data.newPassword === data.passwordConfirmation, {
        message: "Passwords don't match",
        path: ["passwordConfirmation"],
    }),
};