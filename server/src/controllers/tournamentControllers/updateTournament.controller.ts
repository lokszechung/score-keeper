import { Request, Response } from "express";
import updateTournamentService from "../../services/tournamentServices/updateTournament.service";

const updateTournamentController = async (req: Request, res: Response) => {
	if (!req.user) {
		return res.status(401).json({ message: "Unauthorized - Please log in" });
	}

	const { tournamentId } = req.params;

	try {
		const updatedTournament = await updateTournamentService(tournamentId, {
			...req.body,
		});

		if (updatedTournament) {
			return res.status(200).json(updatedTournament);
		}
	} catch (error: any) {
		if (error.message === "Tournament not found") {
			return res.status(404).json({ message: error.message });
		}
		return res.status(500).json({ error: "Internal server error" });
	}
};

export default updateTournamentController;
