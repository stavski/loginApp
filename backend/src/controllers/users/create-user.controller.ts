import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import { prisma, Prisma } from "../../lib/prisma";
import { hash } from "bcryptjs";

export const create = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await hash(password, 8);

        const newUser = await prisma.users.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        return res.status(StatusCodes.CREATED).json({
            message: "User created",
            data: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                created_at: newUser.created_at
            },
        });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return res.status(StatusCodes.CONFLICT).json({
                    message: "Email already exists",
                });
            }
        }

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Internal server error",
        });
    }
};