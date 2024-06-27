import prisma from "../../db/prisma";

const getCurrentUserService = async (userId: string) => {
	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: {
			id: true,
			firstName: true,
			lastName: true,
		},
	});

	return user;
};

export default getCurrentUserService;
