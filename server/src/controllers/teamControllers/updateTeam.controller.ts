import { Request, Response } from "express";
import updateTeamService from "../../services/teamServices/updateTeam.service";

const updateTeamController = async (req: Request, res: Response) => {
	if (!req.user) {
		return res.status(401).json({ message: "Unauthorized - Please log in" });
	}

	const { teamId } = req.params;

	try {
		const updatedTeam = await updateTeamService(teamId, {
			...req.body,
		});

		if (updatedTeam) {
			return res.status(200).json(updatedTeam);
		}
	} catch (error: any) {
		if (error.message === "Team not found") {
			return res.status(404).json({ message: error.message });
		}
		return res.status(500).json({ error: "Internal server error" });
	}
};

export default updateTeamController;
