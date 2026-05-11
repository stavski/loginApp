import { Response } from "express";

import { prisma } from "../../lib/prisma";
import { AuthRequest } from "../../shared/middlewares/auth";

export const me = async (req: AuthRequest, res: Response) => {
    const user = await prisma.users.findUnique({
        where: {
            id: req.userId,
        },
        select: {
            id: true,
            name: true,
            email: true,
            created_at: true,
        },
    });

    if (!user) {
        return res.status(404).json({
            error: "User not found",
        });
    }

    return res.status(200).json({
        data: user,
    });
};