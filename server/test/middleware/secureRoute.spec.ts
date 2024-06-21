import secureRoute from "../../src/middleware/secureRoute";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import prisma from "../../src/db/prisma";
import { jest } from "@jest/globals";
import { json } from "stream/consumers";
import { mock } from "node:test";

jest.mock("jsonwebtoken");

describe("secureRoute middleware tests", () => {
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

	it("should return 401 if no token is provided", async () => {
		req.cookies = {};

		await secureRoute(req as Request, res as Response, jest.fn());

		expect(res.status).toHaveBeenCalledWith(401);
		expect(res.json).toHaveBeenCalledWith({ message: "Unauthorized" });
	});

	it("should return 401 if invalid token is provided", async () => {
		req.cookies = {
			jwt: "invalid",
		};

		jest.spyOn(jwt, "verify").mockImplementation(() => {
			throw new Error("invalid token");
		});

		await secureRoute(req as Request, res as Response, jest.fn());

		expect(res.status).toHaveBeenCalledWith(401);
		expect(res.json).toHaveBeenCalledWith({
			message: "Unauthorized - Invalid token",
		});
	});

	it("should return 404 if no user is found", async () => {
		req.cookies = {
			jwt: "valid",
		};

		jest.spyOn(jwt, "verify").mockImplementation(() => {
			return { userId: "1" };
		});

		jest.spyOn(prisma.user, "findUnique").mockResolvedValue(null);

		await secureRoute(req as Request, res as Response, jest.fn());

		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
	});

	it("should set req.user if user is found", async () => {
		req.cookies = {
			jwt: "valid",
		};

		const mockUser = {
			id: "1",
			firstName: "John",
			lastName: "Doe",
			email: "john.doe@example.com",
		};

		jest.spyOn(jwt, "verify").mockImplementation(() => {
			return { userId: "1" };
		});

		jest.spyOn(prisma.user, "findUnique").mockResolvedValue(mockUser as any);

		await secureRoute(req as Request, res as Response, jest.fn());

		expect(req.user).toEqual(mockUser);
	});
});
