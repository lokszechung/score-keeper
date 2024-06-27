import prisma from "../../db/prisma";
import bcryptjs from "bcryptjs";

const authenticateUserService = async (email: string, password: string) => {
	const user = await prisma.user.findUnique({ where: { email } });

	if (!user) {
		throw new Error("Invalid credentials");
	}

	const passwordMatch = await bcryptjs.compare(password, user.password);

	if (!passwordMatch) {
		throw new Error("Invalid credentials");
	}

	return user;
};

export default authenticateUserService;
