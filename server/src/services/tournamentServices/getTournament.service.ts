import prisma from "../../db/prisma";

const getTournamentService = async (tournamentId: string) => {
	const tournament = await prisma.tournament.findUnique({
		where: { id: tournamentId },
		include: {
			teams: true,
			fixtures: true,
		},
	});

	return tournament;
};

export default getTournamentService;
