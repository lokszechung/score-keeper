import { jest } from "@jest/globals";
import { Request, Response } from "express";
import signUpUserController from "../../../src/controllers/authControllers/signUpUser.controller";
import createUserService from "../../../src/services/authServices/createUser.service";

jest.mock("../../../src/services/authServices/createUser.service");

const mockCreateUserService = createUserService as jest.Mock<
	typeof createUserService
>;

describe("signUpUser controller tests", () => {
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

	it("should return 400 if any field is missing", async () => {
		req.body = {};

		await signUpUserController(req as Request, res as Response);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({
			message:
				"Missing fields: firstName, lastName, email, password, confirmPassword",
		});
	});

	it("should return 400 if passwords do not match", async () => {
		req.body = {
			firstName: "John",
			lastName: "Doe",
			email: "john.doe@example.com",
			password: "password",
			confirmPassword: "confirm",
		};

		await signUpUserController(req as Request, res as Response);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({
			message: "Passwords do not match",
		});
	});

	it("should return 201 if input is valid", async () => {
		req.body = {
			firstName: "John",
			lastName: "Doe",
			email: "john.doe@example.com",
			password: "password",
			confirmPassword: "password",
		};

		mockCreateUserService.mockResolvedValue({
			id: 1,
			firstName: "John",
			lastName: "Doe",
			email: "john.doe@example.com",
		} as never);

		await signUpUserController(req as Request, res as Response);

		expect(mockCreateUserService).toHaveBeenCalledWith({
			firstName: "John",
			lastName: "Doe",
			email: "john.doe@example.com",
			password: "password",
		});
		expect(res.status).toHaveBeenCalledWith(201);
	});
});
