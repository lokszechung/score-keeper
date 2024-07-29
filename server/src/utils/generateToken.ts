import jwt from "jsonwebtoken";
import { Response } from "express";

const generateToken = (userId: string, res: Response) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
		expiresIn: "7d",
	});

	res.cookie("jwt", token, {
		maxAge: 7 * 24 * 60 * 60 * 1000, //milliseconds
		partitioned: true
		// httpOnly: true,
		// sameSite: true,
		// secure: process.env.NODE_ENV === "production",
	});

	return token;
};

export default generateToken;
