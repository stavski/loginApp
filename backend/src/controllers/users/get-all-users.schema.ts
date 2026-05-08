import { z } from "zod";

export const getAllUsersSchema = {
    query: z.object({
        page: z.coerce.number().min(1).default(1),
        limit: z.coerce.number().min(5).max(100).default(5),
        filter: z.coerce.string().optional(),
    }),
};