import prisma from "../../db/prisma";

type CreateTeamData = {
	name: string;
	addedById: string;
	tournamentId: string;
};

const createTeamService = async (createTeamData: CreateTeamData) => {
	const { tournamentId } = createTeamData;

	const tournament = await prisma.tournament.findUnique({
		where: { id: tournamentId },
	});

	if (!tournament) {
		throw new Error("Tournament not found");
	}

	const team = await prisma.team.create({
		data: {
			...createTeamData,
		},
	});

	return team;
};

export default createTeamService;
