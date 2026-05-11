import jwt from "jsonwebtoken";
import { prisma } from "../../src/lib/prisma";
import { testServer } from "../jest.setup";

describe("Update user", () => {
    let token: string;

    beforeAll(() => {
        token = jwt.sign({ id: 1 }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    });

    it("should update user name and email", async () => {
        const user = await prisma.users.create({
            data: {
                name: "Old Name",
                email: "old@test.com",
                password: "123456789",
            },
        });

        const response = await testServer
            .put(`/users/${user.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "New Name",
                email: "new@test.com",
            });

        expect(response.status).toBe(200);

        expect(response.body.data).toEqual({
            id: user.id,
            name: "New Name",
            email: "new@test.com",
            updated_at: expect.any(String),
        });

        const updatedUser = await prisma.users.findUnique({
            where: {
                id: user.id,
            },
        });

        expect(updatedUser?.name).toBe("New Name");
        expect(updatedUser?.email).toBe("new@test.com");
    });

    it("should return 404 when user does not exist", async () => {
        const response = await testServer
            .put("/users/999999")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "New Name",
                email: "new@test.com",
            });

        expect(response.status).toBe(404);

        expect(response.body).toEqual({
            error: "User not found",
        });
    });

    it("should return 409 when email already exists", async () => {
        await prisma.users.createMany({
            data: [
                {
                    name: "User A",
                    email: "usera@test.com",
                    password: "123456789",
                },
                {
                    name: "User B",
                    email: "userb@test.com",
                    password: "123456789",
                },
            ],
        });

        const user = await prisma.users.findFirst({
            where: {
                email: "usera@test.com",
            },
        });

        const response = await testServer
            .put(`/users/${user?.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Updated User",
                email: "userb@test.com",
            });

        expect(response.status).toBe(409);
    });
});