import { Request, Response } from "express";
import createPlayerService from "../../services/playerServices/createPlayer.service";

const createPlayerController = async (req: Request, res: Response) => {
	if (!req.user) {
		return res.status(401).json({ message: "Unauthorized - Please log in" });
	}

	const requiredFields = ["firstName", "lastName", "teamId"];
	const missingFields = requiredFields.filter((field) => !req.body[field]);

	if (missingFields.length > 0) {
		return res.status(400).json({
			message: `Missing fields: ${missingFields.join(", ")}`,
		});
	}

	try {
		const player = await createPlayerService({
			...req.body,
			addedById: req.user.id,
		});

		if (player) {
			return res.status(201).json(player);
		}
	} catch (error: any) {
		if (error.message === "Team not found") {
			return res.status(404).json({ message: error.message });
		}
		return res.status(500).json({ message: error.message });
	}
};

export default createPlayerController;
