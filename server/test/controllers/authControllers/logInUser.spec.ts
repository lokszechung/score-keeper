import { jest } from "@jest/globals";
import { Request, Response } from "express";
import logInUser from "../../../src/controllers/authControllers/logInUser.controller";
import bcryptjs from "bcryptjs";
import prisma from "../../../src/db/prisma";
import generateToken from "../../../src/utils/generateToken";

jest.mock("bcryptjs");
jest.mock("../../../src/utils/generateToken");

const mockGenerateToken = generateToken as jest.Mock<typeof generateToken>;

describe("logInUser controller tests", () => {
	let res: Partial<Response>;
	let req: Partial<Request>;
	let json: jest.Mock;
	let status: jest.Mock;

	beforeEach(() => {
		req = {};
		json = jest.fn();
		status = jest.fn().mockReturnValue({ json });
		res = {
			status: status as unknown as Response["status"],
			json: json as unknown as Response["json"],
		};
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	const mockUser = {
		id: "1",
		firstName: "John",
		lastName: "Doe",
		email: "john.doe@example.com",
		password: "password",
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	it("should return 400 if email field is missing", async () => {
		req.body = {
			password: "password",
		};

		await logInUser(req as Request, res as Response);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({
			message: "All fields are required: email, password",
		});
	});

	it("should return 400 if password field is missing", async () => {
		req.body = {
			email: "john.doe@example.com",
		};

		await logInUser(req as Request, res as Response);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({
			message: "All fields are required: email, password",
		});
	});

	it("should return 400 if email does not exist", async () => {
		req.body = {
			email: "john.doe@example.com",
			password: "password",
		};

		jest.spyOn(prisma.user, "findUnique").mockResolvedValue(null);

		await logInUser(req as Request, res as Response);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({ message: "Invalid credentials" });
	});

	it("should return 400 if password is incorrect", async () => {
		req.body = {
			email: "john.doe@example.com",
			password: "password",
		};

		jest.spyOn(prisma.user, "findUnique").mockResolvedValue(mockUser);
		jest.spyOn(bcryptjs, "compare").mockResolvedValue(false as never);

		await logInUser(req as Request, res as Response);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({ message: "Invalid credentials" });
	});

	it("should generate a token if credentials are valid", async () => {
		req.body = {
			email: "john.doe@example.com",
			password: "password",
		};

		jest.spyOn(prisma.user, "findUnique").mockResolvedValue(mockUser);
		jest.spyOn(bcryptjs, "compare").mockResolvedValue(true as never);
		mockGenerateToken.mockResolvedValue("token" as never);

		await logInUser(req as Request, res as Response);

		expect(mockGenerateToken).toHaveBeenCalledTimes(1);
	});

	it("should return user data if credentials are valid", async () => {
		req.body = {
			email: "john.doe@example.com",
			password: "password",
		};

		const { password, ...mockUserNoPassword } = mockUser;

		jest.spyOn(prisma.user, "findUnique").mockResolvedValue(mockUser);
		jest.spyOn(bcryptjs, "compare").mockResolvedValue(true as never);
		mockGenerateToken.mockResolvedValue("token" as never);

		await logInUser(req as Request, res as Response);

		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith(mockUserNoPassword);
	});
});
