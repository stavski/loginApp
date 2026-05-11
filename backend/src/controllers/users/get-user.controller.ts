import { Response, Request } from "express";
import { prisma } from "../../lib/prisma";

interface GetUserParams {
    id: number;
}

export const getById = async (req: Request, res: Response) => {
    try {
        const { id } = req.validated.params as GetUserParams;

        const user = await prisma.users.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                created_at: true,
            }
        });

        if (!user) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        return res.status(200).json({
            data: user,
        });

    } catch {
        return res.status(500).json({
            error: "Internal server error"
        });
    }
};