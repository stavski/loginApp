import jwt from "jsonwebtoken";
import { prisma } from "../../src/lib/prisma";
import { testServer } from "../jest.setup";

describe("Get all users", () => {
    let token: string;

    beforeAll(() => {
        token = jwt.sign({ id: 1 }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    });

    it("should return all users", async () => {
        await prisma.users.createMany({
            data: [
                {
                    name: "Test User A",
                    email: "testa@test.com",
                    password: "123456789",
                },
                {
                    name: "Test User B",
                    email: "testb@test.com",
                    password: "123456789",
                },
            ],
        });

        const response = await testServer
            .get("/users")
            .set("Authorization", `Bearer ${token}`)
            .query({
                page: 1,
                limit: 5,
            });

        expect(response.status).toBe(200);

        expect(response.body.data).toHaveLength(2);

        expect(response.body.meta).toEqual({
            total: 2,
            page: 1,
            limit: 5,
            totalPages: 1,
        });
    });

    it("should filter users by name", async () => {
        await prisma.users.createMany({
            data: [
                {
                    name: "Test User A",
                    email: "testa@test.com",
                    password: "123456789",
                },
                {
                    name: "Test User B",
                    email: "testb@test.com",
                    password: "123456789",
                },
            ],
        });

        const response = await testServer
            .get("/users")
            .set("Authorization", `Bearer ${token}`)
            .query({
                page: 1,
                limit: 5,
                filter: "Test User A",
            });

        expect(response.status).toBe(200);

        expect(response.body.data).toHaveLength(1);

        expect(response.body.data[0].name).toBe("Test User A");
    });

    it("should return paginated users", async () => {
        await prisma.users.createMany({
            data: [
                {
                    name: "Test User A",
                    email: "testa@test.com",
                    password: "123456789",
                },
                {
                    name: "Test User B",
                    email: "testb@test.com",
                    password: "123456789",
                },
                {
                    name: "Test User C",
                    email: "testc@test.com",
                    password: "123456789",
                },
                {
                    name: "Test User D",
                    email: "testd@test.com",
                    password: "123456789",
                },
                {
                    name: "Test User E",
                    email: "teste@test.com",
                    password: "123456789",
                },
                {
                    name: "Test User F",
                    email: "testf@test.com",
                    password: "123456789",
                },
            ],
        });

        const response = await testServer
            .get("/users")
            .set("Authorization", `Bearer ${token}`)
            .query({
                page: 1,
                limit: 5,
            });

        expect(response.status).toBe(200);

        expect(response.body.data).toHaveLength(5);

        expect(response.body.meta.total).toBe(6);

        expect(response.body.meta.totalPages).toBe(2);
    });

    it("should return empty array when no users exist", async () => {
        const response = await testServer
            .get("/users")
            .set("Authorization", `Bearer ${token}`)
            .query({
                page: 1,
                limit: 5,
            });

        expect(response.status).toBe(200);

        expect(response.body.data).toEqual([]);

        expect(response.body.meta.total).toBe(0);
    });
});