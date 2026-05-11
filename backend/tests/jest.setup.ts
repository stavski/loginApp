import { prisma } from "../src/lib/prisma";
import supertest from 'supertest';
import { app } from "../src/app";

export const testServer = supertest(app);

jest.setTimeout(30000);

beforeAll(async () => {
    await prisma.$connect();
});

beforeEach(async () => {
    await prisma.users.deleteMany();
});

afterAll(async () => {
    await prisma.$disconnect();
});
