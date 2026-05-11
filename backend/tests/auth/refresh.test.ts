import { testServer } from "../jest.setup";

describe("Auth: Refresh Token", () => {
    const userData = {
        name: "Refresh Test",
        email: "refresh@test.com",
        password: "password123",
        passwordConfirmation: "password123",
    };

    beforeEach(async () => {
        await testServer.post("/users").send(userData);
    });

    it("should be able to refresh tokens with a valid refresh token", async () => {
        const loginResponse = await testServer.post("/auth/login").send({
            email: userData.email,
            password: userData.password,
        });

        const { refreshToken: oldRefreshToken, accessToken: oldAccessToken } = loginResponse.body;

        const response = await testServer
            .post("/auth/refresh")
            .send({ refreshToken: oldRefreshToken });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("accessToken");
        expect(response.body).toHaveProperty("refreshToken");
        expect(response.body.accessToken).not.toBe(oldAccessToken);
        expect(response.body.refreshToken).not.toBe(oldRefreshToken);
    });

    it("should not be able to refresh tokens with an invalid token", async () => {
        const response = await testServer
            .post("/auth/refresh")
            .send({ refreshToken: "INVALID-TOKEN" });

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("error", "Invalid or expired refresh token");
    });

    it("should not be able to refresh tokens if the token is missing", async () => {
        const response = await testServer
            .post("/auth/refresh")
            .send({});

        expect(response.status).toBeGreaterThanOrEqual(400);
    });
});