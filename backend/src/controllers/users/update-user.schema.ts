import { z } from "zod";

export const updateUsersSchema = {
    params: z.object({
        id: z.coerce.number().min(1),
    }),

    body: z.object({
        name: z.string().min(4).regex(/^[A-Za-z\s]+$/, "Only letters and spaces are allowed").optional(),
        email: z.email().optional(),
    }),
};