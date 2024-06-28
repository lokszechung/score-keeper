import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import authenticateUserService from "../../services/authServices/authenticateUser.service";
import generateToken from "../../utils/generateToken";

const logInUserController = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res
				.status(400)
				.json({ message: "All fields are required: email, password" });
		}

		const foundUser = await authenticateUserService(email, password);

		generateToken(foundUser.id, res);

		const { password: _, ...user } = foundUser;

		return res.status(200).json(user);
	} catch (error: any) {
		if (error.message === "Invalid credentials") {
			return res.status(400).json({ message: "Invalid credentials" });
		}
		return res.status(500).json({ error: "Internal server error" });
	}
};

export default logInUserController;
