import { Response, Request } from "express";
import { prisma, Prisma } from "../../lib/prisma";

interface DeleteUserParams {
    id: number;
}

export const deleteById = async (req: Request, res: Response) => {
    try {
        const { id } = req.validated.params as DeleteUserParams;
        
        await prisma.users.delete({
            where: {
                id: id,
            },
        });

        return res.status(204).send();
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                return res.status(404).json({
                    error: "User not found",
                });
            }
        }

        return res.status(500).json({
            error: "An unexpected error occurred",
        });
    }
};