import { z } from "zod";

export const createSchema = {
    body: z.object({
        name: z.string().min(4).regex(/^[A-Za-z\s]+$/, "Only letters and spaces are allowed"),
        email: z.email(),
        password: z.string().min(6),
        passwordConfirmation: z.string().min(6),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "Passwords do not match",
        path: ["passwordConfirmation"],
    }),
};