import { Request, Response } from "express";
import getCurrentUserService from "../../services/authServices/getCurrentUser.service";

const getCurrentUserController = async (req: Request, res: Response) => {
	if (!req.user) {
		return res.status(401).json({ message: "Unauthorized" });
	}
	try {
		const user = await getCurrentUserService(req.user.id);

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		return res.status(200).json(user);
	} catch (error) {
		console.error("Error in getMe controller", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

export default getCurrentUserController;
