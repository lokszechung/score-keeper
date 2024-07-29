import { Request, Response } from "express";
import createFixturesService from "../../services/fixtureServices/createFixtures.service";
import generateFixtures from "../../utils/generateFixtures";
import getTournamentService from "../../services/tournamentServices/getTournament.service";
import { format } from "path";

const createFixturesController = async (req: Request, res: Response) => {
	if (!req.user) {
		return res.status(401).json({ message: "Unauthorized - Please log in" });
	}

	//! currently only generates bulk fixtures, and another controller would be needed to generate single fixtures that specify the teams
	//! if keeping it like this, might as well put the tournamentId in the params?
	const { tournamentId } = req.body;

	const requiredFields = ["tournamentId"];
	const missingFields = requiredFields.filter((field) => !req.body[field]);

	if (missingFields.length > 0) {
		return res.status(400).json({
			message: `Missing fields: ${missingFields.join(", ")}`,
		});
	}

	const tournament = await getTournamentService(tournamentId);

	if (!tournament) {
		return res.status(404).json({ message: "Tournament not found" });
	}

	// teams.forEach((team: any) => {
	// 	const teamIds = tournament.teams.map((team) => team.id);
	// 	if (!teamIds.includes(team.id)) {
	// 		return res
	// 			.status(400)
	// 			.json({ error: `${team.id} does not belong to the tournament` });
	// 	}
	// });

	const { pitches, format, teams } = tournament;

	if (!pitches) {
		return res
			.status(400)
			.json({ message: "Tournament has no pitches specified" });
	}

	// console.log(fixtureList);
	try {
		const fixtureList = generateFixtures(format, teams, pitches, tournamentId);

		const fixtures = await createFixturesService({
			tournamentId,
			fixtures: fixtureList!, //! fix this later: fixtureList is not null. change the generateFixtures function to return a non-nullable value
		});

		if (fixtures) {
			return res.status(201).json(fixtures);
		}
	} catch (error: any) {
		if (error.message === "Tournament not found") {
			return res.status(404).json({ message: error.message });
		}
		return res.status(500).json({ error: error.message });
	}
};

export default createFixturesController;
