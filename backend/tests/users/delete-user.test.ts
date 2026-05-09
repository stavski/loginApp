import { testServer } from "../jest.setup";

describe("Delete user", () => {
    it("should delete a user", async () => {
        const createResponse = await testServer.post("/users").send({
            name: "Test User",
            email: "test@test.com",
            password: "123456789",
            passwordConfirmation: "123456789",
        });

        const userId = createResponse.body.data.id;

        const response = await testServer.delete(`/users/${userId}`);

        expect(response.status).toBe(204);
        expect(response.body).toEqual({});
    });

    it("should return 404 if user does not exist", async () => {
        const response = await testServer.delete("/users/999999");

        expect(response.status).toBe(404);
    });
});