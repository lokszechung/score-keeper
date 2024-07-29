import axios from "axios";
import { AuthUserType } from "../providers/AuthProvider";

const apiRootUrl = "http://localhost:5005/api/";

export const createTournamentService = async ({
	name,
	startDateTime,
	format,
}: {
	name: string;
	startDateTime: Date;
	format: string;
}) => {
	try {
		const { data } = await axios.post(`${apiRootUrl}tournament/create`, {
			name,
			startDateTime,
			format,
		}, {withCredentials: true});

		console.log(data);
		console.log("Tournament created!!");

		return data;
	} catch (error) {
		console.log(error);
	}
};
