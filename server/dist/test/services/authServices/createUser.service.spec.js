import createUser from "../../../services/authServices/createUser.service.js";
import bcryptjs from "bcryptjs";
import prisma from "../../../db/prisma.js";
import { jest } from "@jest/globals";
jest.mock("../../../db/prisma.js");
jest.mock("bcryptjs");
describe("createUser service tests", () => {
    const createUserData = {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        password: "password",
    };
    beforeEach(async () => {
        // await prisma.user.deleteMany({});
        jest.clearAllMocks();
        const saltSpy = jest
            .spyOn(bcryptjs, "genSalt")
            .mockResolvedValue("salt");
        const hashSpy = jest
            .spyOn(bcryptjs, "hash")
            .mockResolvedValue("hashedPassword");
        const createSpy = jest.spyOn(prisma.user, "create").mockResolvedValue({
            ...createUserData,
            password: "hashedPassword",
            id: 1,
        });
    });
    it("should hash the password", async () => {
        const rounds = 10;
        await createUser(createUserData);
        expect(bcryptjs.genSalt).toHaveBeenCalledWith(rounds);
        expect(bcryptjs.hash).toHaveBeenCalledWith(createUserData.password, "salt");
    });
    it("should create a user with hashed password", async () => {
        await createUser(createUserData);
        expect(prisma.user.create).toHaveBeenCalledWith({
            data: {
                ...createUserData,
                password: "hashedPassword",
            },
        });
    });
    it("should return the user without the password", async () => {
        const user = await createUser(createUserData);
        expect(user.password).toBeUndefined();
    });
});
