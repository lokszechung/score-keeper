import prisma from "../../db/prisma";

//! currently updates all field, regardless of whether there is change or not
//! may implement partial update in the future
type updatePlayerData = {
	firstName?: string;
	lastName?: string;
	addedById?: string;
	teamId?: string;
};

const updatePlayerService = async (
	playerId: string,
	updatePlayerData: updatePlayerData
) => {
	const player = await prisma.player.findUnique({
		where: { id: playerId },
	});

	if (!player) {
		throw new Error("Player not found");
	}

	const updatedPlayer = await prisma.player.update({
		where: { id: playerId },
		data: {
			...updatePlayerData,
		},
	});

	return updatedPlayer;
};

export default updatePlayerService;
