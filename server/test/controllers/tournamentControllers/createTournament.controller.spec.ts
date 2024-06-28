import { jest } from "@jest/globals";
import { Request, Response } from "express";
import createTournamentController from "../../../src/controllers/tournamentControllers/createTournament.controller";
import createTournamentService from "../../../src/services/tournamentServices/createTournament.service";

jest.mock("../../../src/services/tournamentServices/createTournament.service");

const mockCreateTournamentService = createTournamentService as jest.Mock<
	typeof createTournamentService
>;

describe("createTournament controller tests", () => {
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
		req.body = {};

		await createTournamentController(req as Request, res as Response);

		expect(res.status).toHaveBeenCalledWith(401);
		expect(res.json).toHaveBeenCalledWith({
			message: "Unauthorized - Please log in",
		});
	});

	it("should return 400 if any field is missing", async () => {
		req = {
			body: {},
			user: { id: "1" },
		};

		await createTournamentController(req as Request, res as Response);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({
			message: "Missing fields: name, startDateTime, format",
		});
	});

	it("should return 400 if format is invalid", async () => {
		req = {
			body: {
				name: "Tournament",
				startDateTime: "2022-12-12T12:00:00",
				format: "INVALID_FORMAT",
			},
			user: { id: "1" },
		};

		await createTournamentController(req as Request, res as Response);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({
			message: "Invalid format",
		});
	});

	it("should return 201 if tournament is created", async () => {
		req = {
			body: {
				name: "Tournament",
				startDateTime: "2022-12-12T12:00:00",
				format: "ROUND_ROBIN",
			},
			user: { id: "1" },
		};

		mockCreateTournamentService.mockResolvedValue({
			id: 1,
			name: "Tournament",
			startDateTime: "2022-12-12T12:00:00",
			format: "ROUND_ROBIN",
		} as never);

		await createTournamentController(req as Request, res as Response);

		expect(res.status).toHaveBeenCalledWith(201);
		expect(res.json).toHaveBeenCalledWith({
			id: 1,
			name: "Tournament",
			startDateTime: "2022-12-12T12:00:00",
			format: "ROUND_ROBIN",
		});
	});
});
