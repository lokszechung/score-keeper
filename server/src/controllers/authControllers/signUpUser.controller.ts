import { Request, Response } from "express";
import createUserService from "../../services/authServices/createUser.service";

const signUpUserController = async (req: Request, res: Response) => {
	const requiredFields = [
		"firstName",
		"lastName",
		"email",
		"password",
		"confirmPassword",
	];
	const missingFields = requiredFields.filter((field) => !req.body[field]);

	if (missingFields.length > 0) {
		return res.status(400).json({
			message: `Missing fields: ${missingFields.join(", ")}`,
		});
	}

	const { password, confirmPassword } = req.body;

	if (password !== confirmPassword) {
		return res.status(400).json({ message: "Passwords do not match" });
	}
	try {
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
