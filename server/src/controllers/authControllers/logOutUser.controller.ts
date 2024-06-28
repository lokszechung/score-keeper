import { Request, Response } from "express";

const logOutUserController = async (req: Request, res: Response) => {
	try {
		res.clearCookie("jwt");
		return res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.error("Error in logout controller", error);
		return res.status(500).json({ error: "Internal server error" });
	}
};

export default logOutUserController;
