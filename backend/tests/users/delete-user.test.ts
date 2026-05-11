import jwt from "jsonwebtoken";
import { testServer } from "../jest.setup";

describe("Delete user", () => {
    let token: string;

    beforeAll(() => {
        token = jwt.sign({ id: 1 }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    });

    it("should delete a user", async () => {
        const createResponse = await testServer.post("/users").send({
            name: "Test User",
            email: "test@test.com",
            password: "123456789",
            passwordConfirmation: "123456789",
        });

        const userId = createResponse.body.data.id;

        const response = await testServer
            .delete(`/users/${userId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(204);
        
        expect(response.body).toEqual({});
    });

    it("should return 404 if user does not exist", async () => {
        const response = await testServer
            .delete("/users/999999")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(404);
    });
});