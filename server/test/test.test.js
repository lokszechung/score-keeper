import { jest } from "@jest/globals";
import signUpUser from "../../../controllers/authControllers/signUpUser.controller.js";

const createUser = require("../../../services/authServices/createUser.service.js");

jest.mock("../../../services/authServices/createUser.service.js", () => ({
	_esModule: true,
	createUser: jest.fn(),
}));

describe("signUpUser controller tests", () => {
	let res;
	let req;

	it("should return 201 if input is valid", async () => {
		req.body = {
			firstName: "John",
			lastName: "Doe",
			email: "john.doe@example.com",
			password: "password",
			confirmPassword: "password",
		};

		await signUpUser(req, res);

		console.log(createUser);

		expect(createUser).toHaveBeenCalledWith({
			firstName: "John",
			lastName: "Doe",
			email: "john.doe@example.com",
			password: "password123",
		});
		expect(res.status).toHaveBeenCalledWith(201);
	});
});
