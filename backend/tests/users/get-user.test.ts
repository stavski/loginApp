import { prisma } from "../../src/lib/prisma";
import { testServer } from "../jest.setup";

describe("Get user by id", () => {
    it("should return a user by id", async () => {
        const user = await prisma.users.create({
            data: {
                name: "Test User",
                email: "test@test.com",
                password: "123456789",
            },
        });

        const response = await testServer.get(`/users/${user.id}`);

        expect(response.status).toBe(200);

        expect(response.body.data).toEqual({
            id: user.id,
            name: "Test User",
            email: "test@test.com",
            created_at: expect.any(String),
        });
    });

    it("should return 404 when user does not exist", async () => {
        const response = await testServer.get("/users/999999");

        expect(response.status).toBe(404);

        expect(response.body).toEqual({
            error: "User not found",
        });
    });
});