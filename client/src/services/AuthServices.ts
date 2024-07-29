import axios from "axios";
import { AuthUserType } from "../providers/AuthProvider";

const apiRootUrl = "http://localhost:5005/api/";

export const loginService = async ({
	email,
	password,
}: {
	email: string;
	password: string;
}) => {
	try {
		const { data } = await axios.post<AuthUserType>(`${apiRootUrl}auth/login`, {
			email,
			password,
		});

		console.log(data);
		console.log("Logged in!!");

		return data;
	} catch (error) {
		console.log(error);
	}
};

export const logoutService = async () => {
	try {
		const { data } = await axios.post(`${apiRootUrl}auth/logout`);
		console.log(data);

		return data;
	} catch (error) {
		console.log(error);
	}
};
