import { Request, Response } from "express";
import getPlayerService from "../../services/playerServices/getPlayer.service";

const getPlayerController = async (req: Request, res: Response) => {
	const { playerId } = req.params;

	try {
		const player = await getPlayerService(playerId);

		if (!player) {
			return res.status(404).json({ message: "Player not found" });
		}

		return res.status(200).json(player);
	} catch (error) {
		console.error("Error in getPlayer controller", error);
		return res.status(500).json({ error: "Internal server error" });
	}
};

export default getPlayerController;
