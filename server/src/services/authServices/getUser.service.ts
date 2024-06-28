import prisma from "../../db/prisma";

const getUserService = async (userId: string) => {
	const user = await prisma.user.findUnique({
		where: { id: userId },
		include: {
			organisedTournaments: true,
		},
	});

	return user;
};

export default getUserService;
