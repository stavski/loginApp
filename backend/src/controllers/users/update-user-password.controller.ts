import { Response, Request } from "express";
import { prisma, Prisma } from "../../lib/prisma";
import { compare, hash } from "bcryptjs";

interface UpdateUserPasswordParams {
    id: number;
}

interface UpdateUserPasswordBody {
    currentPassword: string;
    newPassword: string;
}

export const updatePassword = async (req: Request, res: Response) => {
    try {
        const { id } = req.validated.params as UpdateUserPasswordParams;
        const body = req.validated.body as UpdateUserPasswordBody;

        const user = await prisma.users.findUnique({
            where: { id: id },
        });

        if (!user) {
            return res.status(404).json({
                error: "User not found",
            });
        }

        const isPasswordCorrect = await compare(body.currentPassword, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({
                errors: {
                    currentPassword: "The current password does not match"
                }
            });
        }

        const hashedPassword = await hash(body.newPassword, 8);

        await prisma.users.update({
            where: { id: id },
            data: {
                password: hashedPassword,
            },
        });

        return res.status(204).send();

    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return res.status(400).json({
                error: "Unable to update password",
            });
        }

        return res.status(500).json({
            error: "An unexpected error occurred",
        });
    }
};