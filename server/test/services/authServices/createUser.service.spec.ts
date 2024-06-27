import bcryptjs from "bcryptjs";
import prisma from "../../../src/db/prisma";
import { jest } from "@jest/globals";
import createUserService from "../../../src/services/authServices/createUser.service";

jest.mock("bcryptjs");

describe("createUser service tests", () => {
	const createUserData = {
		firstName: "John",
		lastName: "Doe",
		email: "john.doe@example.com",
		password: "password",
	};

	beforeEach(async () => {
		jest.clearAllMocks();

		jest.spyOn(bcryptjs, "genSalt").mockResolvedValue("salt" as never);
		jest.spyOn(bcryptjs, "hash").mockResolvedValue("hashedPassword" as never);
		jest.spyOn(prisma.user, "create").mockResolvedValue({
			...createUserData,
			password: "hashedPassword",
			id: "1",
		} as never);
	});

	it("should hash the password", async () => {
		const rounds = 10;

		await createUserService(createUserData);

		expect(bcryptjs.genSalt).toHaveBeenCalledWith(rounds);
		expect(bcryptjs.hash).toHaveBeenCalledWith(createUserData.password, "salt");
	});

	it("should create a user with hashed password", async () => {
		await createUserService(createUserData);

		expect(prisma.user.create).toHaveBeenCalledTimes(1);
		expect(prisma.user.create).toHaveBeenCalledWith({
			data: {
				...createUserData,
				password: "hashedPassword",
			},
		});
	});

	it("should return the user without the password", async () => {
		type TestUser = {
			id: string;
			password?: string;
		};

		const user: TestUser = await createUserService(createUserData);

		expect(user.password).toBeUndefined();
	});
});
