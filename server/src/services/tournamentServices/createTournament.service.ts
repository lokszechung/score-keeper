import { Format } from "@prisma/client";
import prisma from "../../db/prisma";

type CreateTournamentData = {
	name: string;
	startDateTime: Date;
	format: Format;
	organiserId: string;
};

const createTournamentService = async (
	createTournamentData: CreateTournamentData
) => {
	const tournament = await prisma.tournament.create({
		data: {
			...createTournamentData,
		},
	});

	return tournament;
};

export default createTournamentService;
