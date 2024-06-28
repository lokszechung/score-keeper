import prisma from "../../../src/db/prisma";
import { jest } from "@jest/globals";
import createTournamentService from "../../../src/services/tournamentServices/createTournament.service";

describe("createTournament service tests", () => {
	type Format = "ROUND_ROBIN" | "KNOCK_OUT" | "LEAGUE" | "GROUP_KNOCK_OUT";
	const tournamentData = {
		name: "Tournament",
		startDateTime: new Date(),
		format: "LEAGUE" as Format,
		organiserId: "1",
	};

	beforeEach(() => {
		jest.clearAllMocks();

		jest.spyOn(prisma.tournament, "create").mockResolvedValue({
			...tournamentData,
			id: "1",
		} as never);
	});

	it("should create a tournament", async () => {
		await createTournamentService(tournamentData);

		expect(prisma.tournament.create).toHaveBeenCalledTimes(1);
		expect(prisma.tournament.create).toHaveBeenCalledWith({
			data: tournamentData,
		});
	});

	it("should return the created tournament", async () => {
		const tournament = await createTournamentService(tournamentData);

		expect(tournament).toEqual({
			...tournamentData,
			id: "1",
		});
	});
});
