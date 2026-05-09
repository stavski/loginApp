import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { prisma } from "../../lib/prisma";

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.users.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            return res.status(401).json({
                error: "Invalid email or password",
            });
        }

        const passwordMatches = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatches) {
            return res.status(401).json({
                error: "Invalid email or password",
            });
        }

        const accessToken = jwt.sign(
            {
                sub: user.id,
            },
            process.env.JWT_SECRET!,
            {
                expiresIn: "15m",
            }
        );

        const refreshToken = jwt.sign(
            {
                sub: user.id,
            },
            process.env.JWT_REFRESH_SECRET!,
            {
                expiresIn: "7d",
            }
        );

        return res.status(200).json({
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Internal server error",
        });
    }
};