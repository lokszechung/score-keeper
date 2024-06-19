import prisma from "../../db/prisma.js";
import bcryptjs from "bcryptjs";
const createUser = async (createUserData) => {
    const { password } = createUserData;
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    console.log("hashedPassword", hashedPassword);
    const createdUser = await prisma.user.create({
        data: {
            ...createUserData,
            password: hashedPassword,
        },
    });
    const { password: _, ...user } = createdUser;
    return user;
};
export default createUser;
