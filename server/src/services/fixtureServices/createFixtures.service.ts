import { TournamentStage, Status } from "@prisma/client";
import prisma from "../../db/prisma";

type StageInfo = {
	leg: number | null;
	group: number | string | null;
	round: number | null;
	match: number | null;
};

type fixtureData = {
	tournamentStage: TournamentStage;
	stageInfo: StageInfo;
	tournamentId: string;
	homeTeamId: string;
	awayTeamId: string;
	status: Status;
};

type createFixturesData = {
	tournamentId: string;
	fixtures: fixtureData[];
};

const createFixturesService = async (
	createFixturesData: createFixturesData
) => {
	const { tournamentId } = createFixturesData;

	const tournament = await prisma.tournament.findUnique({
		where: { id: tournamentId },
	});

	if (!tournament) {
		throw new Error("Tournament not found");
	}

	const fixtures = await prisma.fixture.createMany({
		data: [...createFixturesData.fixtures],
	});

	return fixtures;
};

export default createFixturesService;
