import { testServer } from "../jest.setup";

describe("Get Auth User Profile (Me)", () => {
    const userData = {
        name: "Me Test User",
        email: "me_test@test.com",
        password: "password123",
        passwordConfirmation: "password123",
    };

    let accessToken: string;

    beforeEach(async () => {
        await testServer.post("/users").send(userData);

        const loginResponse = await testServer.post("/auth/login").send({
            email: userData.email,
            password: userData.password,
        });

        accessToken = loginResponse.body.accessToken;
    });

    it("should return 200 and user data when token is valid", async () => {
        const response = await testServer
            .get("/auth/me")
            .set("Authorization", `Bearer ${accessToken}`);

        expect(response.status).toBe(200);
        expect(response.body.data.email).toBe(userData.email);
        expect(response.body.data.name).toBe(userData.name);

        expect(response.body.data).not.toHaveProperty("password");
    });

    it("should return 401 when token is missing", async () => {
        const response = await testServer.get("/auth/me");

        expect(response.status).toBe(401);
    });

    it("should return 401 when token is invalid", async () => {
        const response = await testServer
            .get("/auth/me")
            .set("Authorization", `Bearer invalid-token`);

        expect(response.status).toBe(401);
    });
});