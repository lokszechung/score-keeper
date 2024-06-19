import prisma from "../../db/prisma.js";
import bcryptjs from "bcryptjs";
const signUpUserService = async (req) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const createdUser = await prisma.user.create({
        data: {
            firstName,
            lastName,
            email,
            password: hashedPassword,
        },
    });
    const { password: _, ...user } = createdUser;
    return user;
};
export default signUpUserService;
