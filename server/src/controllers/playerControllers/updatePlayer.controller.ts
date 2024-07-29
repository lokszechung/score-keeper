import { Request, Response } from "express";
import updatePlayerService from "../../services/playerServices/updatePlayer.service";

const updatePlayerController = async (req: Request, res: Response) => {
	if (!req.user) {
		return res.status(401).json({ message: "Unauthorized - Please log in" });
	}

	const { playerId } = req.params;

	//TODO currently, anyone logged in can change anything ater will add fields into tournament/team/player to only allow organiser/admin to change things

	try {
		const updatedPlayer = await updatePlayerService(playerId, {
			...req.body,
		});

		if (updatedPlayer) {
			return res.status(200).json(updatedPlayer);
		}
	} catch (error: any) {
		if (error.message === "Player not found") {
			return res.status(404).json({ message: error.message });
		}
		return res.status(500).json({ error: "Internal server error" });
	}
};

export default updatePlayerController;
