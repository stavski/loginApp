import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../../lib/prisma";

interface RefreshTokenBody {
    refreshToken: string;
}

export const refresh = async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.validated.body as RefreshTokenBody;

        const decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET!
        ) as jwt.JwtPayload;

        const userId = Number(decoded.sub);

        if (isNaN(userId)) {
            return res.status(401).json({ error: "Invalid user ID in token" });
        }

        const user = await prisma.users.findUnique({
            where: { id: userId }
        });

        if (!user) {
            return res.status(401).json({ error: "User no longer exists" });
        }

        const accessToken = jwt.sign(
            { sub: user.id,nonce: Math.random() },
            process.env.JWT_SECRET!,
            { expiresIn: "15m" }
        );

        const newRefreshToken = jwt.sign(
            { sub: user.id, nonce: Math.random() },
            process.env.JWT_REFRESH_SECRET!,
            { expiresIn: "7d" }
        );

        return res.status(200).json({
            accessToken,
            refreshToken: newRefreshToken,
        });

    } catch {
        return res.status(401).json({
            error: "Invalid or expired refresh token",
        });
    }
};