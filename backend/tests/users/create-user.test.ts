import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Create user", () => {
    it("should create a user", async () => {
        const response = await testServer.post("/users").send({ 
            name: "Test User",
            email: "test@test.com",
            password: "123456789",
            passwordConfirmation: "123456789",
        });

        expect(response.status).toBe(StatusCodes.CREATED);
        expect(response.body.message).toBe("User created");
        expect(response.body.data.body.name).toBe("Test User");
        expect(response.body.data.body.email).toBe("test@test.com");
    });

    it("should return 400 if passwords do not match", async () => {
        const response = await testServer.post("/users").send({
            name: "Test User",
            email: "test@test.com",
            password: "123456789",
            passwordConfirmation: "12345678",
        });

        expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors).toHaveProperty("passwordConfirmation", "Passwords do not match");
    });
});