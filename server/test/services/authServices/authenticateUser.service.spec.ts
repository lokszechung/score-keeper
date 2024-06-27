import bcryptjs from "bcryptjs";
import prisma from "../../../src/db/prisma";
import { jest } from "@jest/globals";
import authenticateUserService from "../../../src/services/authServices/authenticateUser.service";

jest.mock("bcryptjs");

describe("authenticateUser service tests", () => {
	const userData = {
		email: "john.doe@example.com",
		password: "password",
	};

	const mockUser = {
		id: "1",
		firstName: "John",
		lastName: "Doe",
		email: "john.doe@example.com",
		password: "password",
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	afterEach(async () => {
		jest.clearAllMocks();
	});

	it("should throw error if user is not found by email", async () => {
		jest.spyOn(prisma.user, "findUnique").mockResolvedValue(null);
		await expect(
			authenticateUserService(userData.email, userData.password)
		).rejects.toThrow("Invalid credentials");

		expect(prisma.user.findUnique).toHaveBeenCalledWith({
			where: { email: userData.email },
		});
	});

	it("should throw error if password does not match", async () => {
		jest.spyOn(prisma.user, "findUnique").mockResolvedValue(mockUser);
		jest.spyOn(bcryptjs, "compare").mockResolvedValue(false as never);

		await expect(
			authenticateUserService(userData.email, userData.password)
		).rejects.toThrow("Invalid credentials");

		expect(bcryptjs.compare).toHaveBeenCalledTimes(1);
	});

	it("should return user if credentials are valid", async () => {
		jest.spyOn(prisma.user, "findUnique").mockResolvedValue(mockUser);
		jest.spyOn(bcryptjs, "compare").mockResolvedValue(true as never);

		const result = await authenticateUserService(
			userData.email,
			userData.password
		);

		expect(prisma.user.findUnique).toBeTruthy();
		expect(bcryptjs.compare).toHaveBeenCalledTimes(1);
		expect(result).toEqual(mockUser);
	});
});
