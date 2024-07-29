import { Request, Response } from "express";
import createTeamService from "../../services/teamServices/createTeam.service";

const createTeamController = async (req: Request, res: Response) => {
	if (!req.user) {
		return res.status(401).json({ message: "Unauthorized - Please log in" });
	}

	const requiredFields = ["name", "tournamentId"];
	const missingFields = requiredFields.filter((field) => !req.body[field]);

	if (missingFields.length > 0) {
		return res.status(400).json({
			message: `Missing fields: ${missingFields.join(", ")}`,
		});
	}

	try {
		const team = await createTeamService({
			...req.body,
			addedById: req.user.id,
		});

		if (team) {
			return res.status(201).json(team);
		}
	} catch (error: any) {
		if (error.message === "Tournament not found") {
			return res.status(404).json({ message: error.message });
		}
		if (error.code === "P2002") {
			return res
				.status(400)
				.json({ message: "Team name already exists in this tournament" });
		}
		// return res.status(500).json({ message: error.message });
		return res.status(500).json({ error: "Internal server error" });
	}
};

export default createTeamController;
