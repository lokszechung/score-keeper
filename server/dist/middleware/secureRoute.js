import jwt from "jsonwebtoken";
import prisma from "../db/prisma.js";
const secureRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedPayload) {
            return res.status(401).json({ message: "Unauthorized - Invalid token" });
        }
        const user = await prisma.user.findUnique({
            where: { id: decodedPayload.userId },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
            },
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.log("Error in secureRoute middleware", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
export default secureRoute;
