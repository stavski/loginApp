import { z } from "zod";

export const getAllUsersSchema = {
    query: z.object({
        page: z.coerce.number().min(1).default(1),
        limit: z.coerce.number().min(10).max(100).default(10),
        filter: z.coerce.string().optional(),
    }),
};