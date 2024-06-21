import { Request, Response } from "express";
import prisma from "../../db/prisma";

const getMe = async (req: Request, res: Response) => {
	try {
		const user = await prisma.user.findUnique({
			where: { id: req.user.id },
			select: {
				id: true,
				firstName: true,
				lastName: true,
			},
		});

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		res.status(200).json(user);
	} catch (error) {
		console.error("Error in getMe controller", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

export default getMe;
