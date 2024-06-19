import { Request, Response } from "express";

const logOutUser = async (req: Request, res: Response) => {
	try {
		res.clearCookie("jwt");
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.error("Error in logout controller", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

export default logOutUser;
