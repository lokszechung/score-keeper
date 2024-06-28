import { Request, Response } from "express";
import getTournamentService from "../../services/tournamentServices/getTournament.service";

const getTournamentController = async (req: Request, res: Response) => {
	const { tournamentId } = req.params;
	try {
		const tournament = await getTournamentService(tournamentId);

		if (!tournament) {
			return res.status(404).json({ message: "Tournament not found" });
		}
		return res.status(200).json(tournament);
	} catch (error) {
		console.error("Error in getTournament controller", error);
		return res.status(500).json({ error: "Internal server error" });
	}
};

export default getTournamentController;
