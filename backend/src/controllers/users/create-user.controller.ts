import { Response, Request } from "express";
import { prisma, Prisma } from "../../lib/prisma";
import { hash } from "bcryptjs";

interface CreateUserBody {
    name: string;
    email: string;
    password: string;
}

export const create = async (req: Request, res: Response) => {
    try {
        const body = req.validated.body as CreateUserBody;

        const hashedPassword = await hash(body.password, 8);

        const newUser = await prisma.users.create({
            data: {
                name: body.name,
                email: body.email,
                password: hashedPassword,
            },
        });

        return res.status(201).json({
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
                return res.status(409).json({
                    error: {
                        email: "Email already exists",
                    }
                });
            }
        }

        return res.status(500).json({
            error: "An unexpected error occurred",
        });
    }
};