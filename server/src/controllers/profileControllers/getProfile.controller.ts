import { Request, Response } from "express";
import getUserService from "../../services/authServices/getUser.service";

const getProfileController = async (req: Request, res: Response) => {
	const { userId } = req.params;
	try {
		const user = await getUserService(userId);

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		return res.status(200).json(user);
	} catch (error) {
		console.error("Error in getProfile controller", error);
		return res.status(500).json({ error: "Internal server error" });
	}
};

export default getProfileController;
