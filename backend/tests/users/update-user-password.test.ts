import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "../../src/lib/prisma";
import { testServer } from "../jest.setup";

describe("Change password", () => {
    let token: string;

    beforeAll(() => {
        token = jwt.sign({ id: 1 }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    });

    it("should change user password", async () => {
        const hashedPassword = await bcrypt.hash("123456789", 10);

        const user = await prisma.users.create({
            data: {
                name: "Test User",
                email: "test@test.com",
                password: hashedPassword,
            },
        });

        const response = await testServer
            .patch(`/users/${user.id}/update-password`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                currentPassword: "123456789",
                newPassword: "987654321",
                passwordConfirmation: "987654321",
            });

        expect(response.status).toBe(204);

        const updatedUser = await prisma.users.findUnique({
            where: {
                id: user.id,
            },
        });

        const passwordMatches = await bcrypt.compare(
            "987654321",
            updatedUser!.password
        );

        expect(passwordMatches).toBe(true);
    });

    it("should return 401 when current password is invalid", async () => {
        const hashedPassword = await bcrypt.hash("123456789", 10);

        const user = await prisma.users.create({
            data: {
                name: "Test User",
                email: "test@test.com",
                password: hashedPassword,
            },
        });

        const response = await testServer
            .patch(`/users/${user.id}/update-password`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                currentPassword: "wrong-password",
                newPassword: "987654321",
                passwordConfirmation: "987654321",
            });

        expect(response.status).toBe(401);

        expect(response.body).toEqual({
            errors: {
                currentPassword: "The current password does not match"
            }
        });
    });

    it("should return 404 when user does not exist", async () => {
        const response = await testServer
            .patch("/users/999999/update-password")
            .set("Authorization", `Bearer ${token}`)
            .send({
                currentPassword: "123456789",
                newPassword: "987654321",
                passwordConfirmation: "987654321",
            });

        expect(response.status).toBe(404);
    });
});