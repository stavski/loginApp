import { testServer } from "../jest.setup";

describe("Create user", () => {
    it("should create a user", async () => {
        const response = await testServer.post("/users").send({
            name: "Test User",
            email: "test@test.com",
            password: "123456789",
            passwordConfirmation: "123456789",
        });

        expect(response.status).toBe(201);
        expect(response.body.data.name).toBe("Test User");
        expect(response.body.data.email).toBe("test@test.com");
    });

    it("should return 400 if passwords do not match", async () => {
        const response = await testServer.post("/users").send({
            name: "Test User",
            email: "test@test.com",
            password: "123456789",
            passwordConfirmation: "12345678",
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors).toHaveProperty("passwordConfirmation", "Passwords do not match");
    });

    it("should return 409 if email already exists", async () => {
        await testServer.post("/users").send({
            name: "Test User",
            email: "test@test.com",
            password: "123456789",
            passwordConfirmation: "123456789",
        });

        const response = await testServer.post("/users").send({
            name: "Test User",
            email: "test@test.com",
            password: "123456789",
            passwordConfirmation: "123456789",
        });

        expect(response.status).toBe(409);
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toHaveProperty("email", "Email already exists");
    });
});