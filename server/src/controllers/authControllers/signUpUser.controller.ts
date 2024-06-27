import { Request, Response } from "express";
import createUserService from "../../services/authServices/createUser.service";

const signUpUserController = async (req: Request, res: Response) => {
	try {
		const { firstName, lastName, email, password, confirmPassword } = req.body;

		if (!firstName || !lastName || !email || !password || !confirmPassword) {
			return res.status(400).json({
				message:
					"All fields are required: firstName, lastName, email, password, confirmPassword",
			});
		}

		if (password !== confirmPassword) {
			return res.status(400).json({ message: "Passwords do not match" });
		}

		const { confirmPassword: _, ...createUserData } = req.body;

		const user = await createUserService(createUserData);

		if (user) {
			return res.status(201).json(user);
		}
	} catch (error: any) {
		if (error.code === "P2002") {
			return res.status(400).json({ message: "Email already exists" });
		}
		console.error("Error in signup controller", error);
		return res.status(500).json({ message: error.message });
	}
};

export default signUpUserController;
