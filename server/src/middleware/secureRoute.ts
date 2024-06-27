import jwt, { JwtPayload } from "jsonwebtoken";

import { Request, Response, NextFunction } from "express";
import prisma from "../db/prisma";

interface DecodedPayload extends JwtPayload {
	userId: string;
}

declare global {
	namespace Express {
		interface Request {
			user?:
				| {
						id: string;
				  }
				| undefined;
		}
	}
}

const secureRoute = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.cookies.jwt;
		if (!token) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		let decodedPayload;
		try {
			decodedPayload = jwt.verify(
				token,
				process.env.JWT_SECRET!
			) as DecodedPayload;
		} catch (error) {
			return res.status(401).json({ message: "Unauthorized - Invalid token" });
		}

		if (!decodedPayload) {
			return res.status(401).json({ message: "Unauthorized - Invalid token" });
		}

		const user = await prisma.user.findUnique({
			where: { id: decodedPayload.userId },
			select: {
				id: true,
				email: true,
				firstName: true,
				lastName: true,
			},
		});

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		req.user = user;

		next();
	} catch (error) {
		console.log("Error in secureRoute middleware", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

export default secureRoute;
