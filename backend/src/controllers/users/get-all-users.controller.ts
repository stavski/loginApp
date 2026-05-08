import { Response, Request } from "express";
import { prisma } from "../../lib/prisma";

interface GetUsersQuery {
    page: number;
    limit: number;
    filter: string;
}

export const getAll = async (req: Request, res: Response) => {
    try {
        const query = req.validated.query as GetUsersQuery;
        
        const skip = (query.page - 1) * query.limit;

        const [users, total] = await prisma.$transaction([
            prisma.users.findMany({
                where: {
                    OR: query.filter ? [
                        { name: { contains: query.filter } },
                        { email: { contains: query.filter } }
                    ] : undefined
                },
                take: query.limit,
                skip: skip,
                select: {
                    id: true,
                    name: true,
                    email: true,
                    created_at: true
                },
                orderBy: {
                    name: 'asc'
                }
            }),
            prisma.users.count({
                where: {
                    OR: query.filter ? [
                        { name: { contains: query.filter } },
                        { email: { contains: query.filter } }
                    ] : undefined
                }
            })
        ]);

        return res.status(200).json({
            data: users,
            meta: {
                total,
                page: query.page,
                limit: query.limit,
                totalPages: Math.ceil(total / query.limit)
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
};