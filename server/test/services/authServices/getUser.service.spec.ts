import prisma from "../../../src/db/prisma";
import { jest } from "@jest/globals";
import getCurrentUserService from "../../../src/services/authServices/getUser.service";
import exp from "constants";

describe("getCurrentUser service tests", () => {
	const userId = "1";

	beforeEach(() => {
		jest.clearAllMocks();

		jest.spyOn(prisma.user, "findUnique").mockResolvedValue({
			id: userId,
			firstName: "John",
			lastName: "Doe",
		} as never);
	});

	it("should return the user", async () => {
		await getCurrentUserService(userId);

		expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
		expect(prisma.user.findUnique).toHaveBeenCalledWith({
			where: { id: userId },
			include: {
				organisedTournaments: true,
			},
		});
	});
});
