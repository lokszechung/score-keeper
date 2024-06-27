import { jest } from "@jest/globals";
import { Request, Response } from "express";
import getCurrentUserController from "../../../src/controllers/authControllers/getCurrentUser.controller";
import getCurrentUserService from "../../../src/services/authServices/getCurrentUser.service";

jest.mock("../../../src/services/authServices/getCurrentUser.service");

const mockGetCurrentUserService = getCurrentUserService as jest.Mock<
	typeof getCurrentUserService
>;

describe("getCurrentUser controller tests", () => {
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

	it("should return 401 if no user is found in the request", async () => {
		await getCurrentUserController(req as Request, res as Response);

		expect(res.status).toHaveBeenCalledWith(401);
		expect(res.json).toHaveBeenCalledWith({ message: "Unauthorized" });
	});

	it("should return 404 if user not found in the database", async () => {
		req.user = { id: "1" };

		mockGetCurrentUserService.mockResolvedValue(null);

		await getCurrentUserController(req as Request, res as Response);

		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
	});

	it("should return 200 if user is found in the database", async () => {
		req.user = { id: "1" };

		mockGetCurrentUserService.mockResolvedValue({
			id: "1",
			firstName: "John",
			lastName: "Doe",
		});

		await getCurrentUserController(req as Request, res as Response);

		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith({
			id: "1",
			firstName: "John",
			lastName: "Doe",
		});
	});
});
