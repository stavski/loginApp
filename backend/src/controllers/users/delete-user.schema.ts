import { z } from "zod";

export const deleteUsersSchema = {
    params: z.object({
        id: z.coerce.number().min(1),
    }),
};