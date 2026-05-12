import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient, Prisma as PrismaNamespace } from "../../generated/prisma/client";

const adapterConfig = {
    host: process.env.DATABASE_HOST || "127.0.0.1",
    user: process.env.DATABASE_USER || "root",
    password: process.env.DATABASE_PASSWORD || "root",
    database: process.env.DATABASE_NAME || "loginAppTest",
    connectionLimit: process.env.NODE_ENV === 'test' ? 10 : 5,
};

const adapter = new PrismaMariaDb(adapterConfig);

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export { PrismaNamespace as Prisma };