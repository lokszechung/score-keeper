import prisma from "../../db/prisma";

const getTeamService = async (teamId: string) => {
	const team = await prisma.team.findUnique({
		where: { id: teamId },
		include: {
			players: true,
			homeFixtures: true,
			awayFixtures: true,
		},
	});

	return team;
};

export default getTeamService;
