import { jest } from "@jest/globals";
import { Request, Response } from "express";
import logInUserController from "../../../src/controllers/authControllers/logInUser.controller";
import authenticateUserService from "../../../src/services/authServices/authenticateUser.service";
import bcryptjs from "bcryptjs";
import prisma from "../../../src/db/prisma";
import generateToken from "../../../src/utils/generateToken";
import { mock } from "node:test";

jest.mock("../../../src/services/authServices/authenticateUser.service");
jest.mock("../../../src/utils/generateToken");

const mockAuthenticateUserService = authenticateUserService as jest.Mock<
	typeof authenticateUserService
>;
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

		await logInUserController(req as Request, res as Response);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({
			message: "All fields are required: email, password",
		});
	});

	it("should return 400 if password field is missing", async () => {
		req.body = {
			email: "john.doe@example.com",
		};

		await logInUserController(req as Request, res as Response);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({
			message: "All fields are required: email, password",
		});
	});

	it("should return 400 if user cannot be authenticated", async () => {
		req.body = {
			email: "john.doe@example.com",
			password: "password",
		};

		mockAuthenticateUserService.mockRejectedValue(
			new Error("Invalid credentials")
		);

		await logInUserController(req as Request, res as Response);

		expect(mockAuthenticateUserService).toHaveBeenCalledWith(
			req.body.email,
			req.body.password
		);
		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({ message: "Invalid credentials" });
	});

	it("should generate a token if credentials are valid", async () => {
		req.body = {
			email: "john.doe@example.com",
			password: "password",
		};

		mockAuthenticateUserService.mockResolvedValue(mockUser);

		mockGenerateToken.mockResolvedValue("token" as never);

		await logInUserController(req as Request, res as Response);

		expect(mockAuthenticateUserService).toHaveBeenCalledWith(
			req.body.email,
			req.body.password
		);
		expect(mockGenerateToken).toHaveBeenCalledWith(mockUser.id, res);
	});

	it("should return user data if credentials are valid", async () => {
		req.body = {
			email: "john.doe@example.com",
			password: "password",
		};

		const { password, ...mockUserNoPassword } = mockUser;

		mockAuthenticateUserService.mockResolvedValue(mockUser);
		mockGenerateToken.mockResolvedValue("token" as never);

		await logInUserController(req as Request, res as Response);

		expect(mockAuthenticateUserService).toHaveBeenCalledWith(
			req.body.email,
			req.body.password
		);
		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith(mockUserNoPassword);
	});
});
