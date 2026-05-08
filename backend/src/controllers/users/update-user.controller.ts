import { Response, Request } from "express";
import { prisma, Prisma } from "../../lib/prisma";

interface UpdateUserParams {
    id: number;
}

interface UpdateUserBody {
    name?: string;
    email?: string;
}

export const update = async (req: Request, res: Response) => {
    try {
        const { id } = req.validated.params as UpdateUserParams;
        const body = req.validated.body as UpdateUserBody;

        if (body.email) {
            const emailExists = await prisma.users.findFirst({
                where: {
                    email: body.email,
                    NOT: { id: id }
                }
            });

            if (emailExists) {
                return res.status(409).json({
                    error: "Email already exists"
                });
            }
        }

        const updatedUser = await prisma.users.update({
            where: { id },
            data: {
                name: body.name,
                email: body.email,
            },
            select: {
                id: true,
                name: true,
                email: true,
                updated_at: true
            }
        });

        return res.status(200).json(updatedUser);

    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                return res.status(404).json({
                    error: "User not found"
                });
            }
        }

        return res.status(500).json({
            error: "Internal server error"
        });
    }
};