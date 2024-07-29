import prisma from "../../db/prisma";

type updateTeamData = {
	name?: string;
	addedById?: string;
	tournamentId?: string;
};

const updateTeamService = async (
	teamId: string,
	updateTeamData: updateTeamData
) => {
	const team = await prisma.team.findUnique({ where: { id: teamId } });

	if (!team) {
		throw new Error("Team not found");
	}

	const updatedTeam = await prisma.team.update({
		where: { id: teamId },
		data: { ...updateTeamData },
	});

	return updatedTeam;
};

export default updateTeamService;
