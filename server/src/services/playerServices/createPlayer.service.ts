import prisma from "../../db/prisma";

type CreatePlayerData = {
	firstName: string;
	lastName: string;
	addedById: string;
	teamId: string;
};

const createPlayerService = async (createPlayerData: CreatePlayerData) => {
	const { teamId } = createPlayerData;

	const team = await prisma.team.findUnique({ where: { id: teamId } });

	if (!team) {
		throw new Error("Team not found");
	}

	const player = await prisma.player.create({
		data: {
			...createPlayerData,
		},
	});

	return player;
};

export default createPlayerService;
