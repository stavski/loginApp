import jwt from "jsonwebtoken";
import { prisma } from "../../src/lib/prisma";
import { testServer } from "../jest.setup";

describe("Get user by id", () => {
    let token: string;

    beforeAll(() => {
        token = jwt.sign({ id: 1 }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    });

    it("should return a user by id", async () => {
        const user = await prisma.users.create({
            data: {
                name: "Test User",
                email: "test@test.com",
                password: "123456789",
            },
        });

        const response = await testServer
            .get(`/users/${user.id}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);

        expect(response.body.data).toEqual({
            id: user.id,
            name: "Test User",
            email: "test@test.com",
            created_at: expect.any(String),
        });
    });

    it("should return 404 when user does not exist", async () => {
        const response = await testServer
            .get("/users/999999")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(404);

        expect(response.body).toEqual({
            error: "User not found",
        });
    });
});