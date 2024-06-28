import { Request, Response } from "express";
import createTournamentService from "../../services/tournamentServices/createTournament.service";

const createTournamentController = async (req: Request, res: Response) => {
	try {
		const { format } = req.body;

		if (!req.user) {
			return res.status(401).json({ message: "Unauthorized - Please log in" });
		}

		const requiredFields = ["name", "startDateTime", "format"];
		const missingFields = requiredFields.filter((field) => !req.body[field]);

		if (missingFields.length > 0) {
			return res.status(400).json({
				message: `Missing fields: ${missingFields.join(", ")}`,
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
