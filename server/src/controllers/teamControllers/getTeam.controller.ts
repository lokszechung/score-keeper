import { Request, Response } from "express";
import getTeamService from "../../services/teamServices/getTeam.service";

const getTeamController = async (req: Request, res: Response) => {
	const { teamId } = req.params;

	try {
		const team = await getTeamService(teamId);

		if (!team) {
			return res.status(404).json({ message: "Team not found" });
		}

		return res.status(200).json(team);
	} catch (error) {
		console.error("Error in getTeam controller", error);
		return res.status(500).json({ error: "Internal server error" });
	}
};

export default getTeamController;
