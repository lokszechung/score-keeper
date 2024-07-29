type Format = "ROUND_ROBIN" | "KNOCK_OUT" | "LEAGUE" | "GROUP_KNOCK_OUT";
type Team = { id: string; name: string };

const generateFixtures = (
	format: Format,
	teams: Team[],
	pitches: number,
	tournamentId: string
) => {
	if (format === "ROUND_ROBIN") {
		return generateRoundRobin(format, teams, pitches, tournamentId);
	}

	throw new Error("Currently can only generate fixtures for ROUND_ROBIN");
};

const generateRoundRobin = (
	format: Format,
	teams: Team[],
	pitches: number,
	tournamentId: string
) => {
	const fixtures: any[] = [];
	const allMatches: any[] = [];

	for (let i = 0; i < teams.length; i++) {
		for (let j = i + 1; j < teams.length; j++) {
			allMatches.push([teams[i].id, teams[j].id]);
		}
	}

	const approxRounds: any[][] = Array.from(
		{ length: allMatches.length },
		() => []
	);

	const canPlaceMatch = (round: any[], match: any[]) => {
		return (
			round.length < pitches &&
			!round.some((game) => game.includes(match[0]) || game.includes(match[1]))
		);
	};

	allMatches.forEach((match) => {
		for (let i = 0; i < approxRounds.length; i++) {
			if (canPlaceMatch(approxRounds[i], match)) {
				approxRounds[i].push(match);
				break;
			}
		}
	});

	const rounds = approxRounds.filter((round) => round.length > 0);

	for (let i = 0; i < rounds.length; i++) {
		for (let j = 0; j < rounds[i].length; j++) {
			fixtures.push({
				tournamentStage: "LEAGUE",
				stageInfo: { leg: null, group: null, round: i + 1, match: j + 1 },
				status: "PREMATCH",
				tournamentId,
				homeTeamId: rounds[i][j][0],
				awayTeamId: rounds[i][j][1],
			});

			// tournamentStage can be LEAGUE is round robin, GROUP, KNOCK_OUT, SEMI_FINAL, FINAL etc for group and knockout
			// stageInfo.group can be A, B, C etc for group stage or null if league format
			// stageInfo.round is the round or matchday number. leg can be 1 or 2 for home and away leg in knockout stage for instance.
		}
	}

	return fixtures;
};

export default generateFixtures;
