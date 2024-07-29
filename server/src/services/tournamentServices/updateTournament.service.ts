import { Format } from "@prisma/client";
import prisma from "../../db/prisma";

type updateTournamentData = {
	name?: string;
	startDateTime?: Date;
	format?: Format;
	organiserId?: string;
	description?: string;
};

const updateTournamentService = async (
	tournamentId: string,
	updateTournamentData: updateTournamentData
) => {
	const tournament = await prisma.tournament.findUnique({
		where: { id: tournamentId },
	});

	if (!tournament) {
		throw new Error("Tournament not found");
	}

	const updatedTournament = await prisma.tournament.update({
		where: { id: tournamentId },
		data: { ...updateTournamentData },
	});

	return updatedTournament;
};

export default updateTournamentService;
