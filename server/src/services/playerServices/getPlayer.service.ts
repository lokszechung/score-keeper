import prisma from "../../db/prisma";

const getPlayerService = async (playerId: string) => {
	const player = await prisma.player.findUnique({
		where: { id: playerId },
	});

	return player;
};

export default getPlayerService;
