import { jest } from "@jest/globals";
import { Request, Response } from "express";
import logOutUserController from "../../../src/controllers/authControllers/logOutUser.controller";

describe("logOutUser controller tests", () => {
	let res: Partial<Response>;
	let req: Partial<Request>;
	let json: jest.Mock;
	let status: jest.Mock;
	let clearCookie: jest.Mock;

	beforeEach(() => {
		req = {};
		clearCookie = jest.fn();
		json = jest.fn();
		status = jest.fn().mockReturnValue({ json });
		res = {
			clearCookie: clearCookie as unknown as Response["clearCookie"],
			status: status as unknown as Response["status"],
			json: json as unknown as Response["json"],
		};
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should clear cookie and return 200", async () => {
		await logOutUserController(req as Request, res as Response);

		expect(res.clearCookie).toHaveBeenCalledWith("jwt");
		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith({
			message: "Logged out successfully",
		});
	});
});
