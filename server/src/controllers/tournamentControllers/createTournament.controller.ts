import { Request, Response } from "express";
import createTournamentService from "../../services/tournamentServices/createTournament.service";

const createTournamentController = async (req: Request, res: Response) => {
	try {
		const { name, startDateTime, format } = req.body;

		if (!req.user) {
			return res.status(401).json({ message: "Unauthorized - Please log in" });
		}

		if (!name || !startDateTime || !format) {
			return res.status(400).json({
				message: "Missing fields: name, startDateTime, format",
			});
		}

		const validFormats = [
			"ROUND_ROBIN",
			"KNOCK_OUT",
			"LEAGUE",
			"GROUP_KNOCK_OUT",
		];

		if (!validFormats.includes(format)) {
			return res.status(400).json({
				message: "Invalid format",
			});
		}

		const tournament = await createTournamentService({
			...req.body,
			organiserId: req.user.id,
		});

		if (tournament) {
			return res.status(201).json(tournament);
		}
	} catch (error: any) {
		console.error("Error in createTournament controller", error);
		return res.status(500).json({ message: error.message });
	}
};

export default createTournamentController;
