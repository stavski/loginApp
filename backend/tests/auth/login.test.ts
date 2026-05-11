import { testServer } from "../jest.setup";

describe("Login User", () => {
    const userData = {
        name: "Login Test",
        email: "login@test.com",
        password: "password123",
        passwordConfirmation: "password123",
    };

    beforeEach(async () => {
        const response = await testServer.post("/users").send(userData);

        expect(response.status).toBe(201); 
    });

    it("should login successfully with valid credentials", async () => {
        const response = await testServer.post("/auth/login").send({
            email: userData.email,
            password: userData.password,
        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("accessToken");
        expect(response.body).toHaveProperty("refreshToken");
        expect(response.body.user.email).toBe(userData.email);
    });

    it("should return 401 for non-existent email", async () => {
        const response = await testServer.post("/auth/login").send({
            email: "nonexistent@test.com",
            password: "anypassword",
        });

        expect(response.status).toBe(401);
        expect(response.body.error).toBe("Invalid email or password");
    });

    it("should return 401 for incorrect password", async () => {
        const response = await testServer.post("/auth/login").send({
            email: userData.email,
            password: "wrongpassword",
        });

        expect(response.status).toBe(401);
        expect(response.body.error).toBe("Invalid email or password");
    });
});