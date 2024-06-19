import createUser from "../../services/authServices/createUser.service.js";
const signUpUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword } = req.body;
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            return res.status(400).json({
                message: "All fields are required: firstName, lastName, email, password, confirmPassword",
            });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }
        const { confirmPassword: _, ...createUserData } = req.body;
        const user = await createUser(createUserData);
        if (user) {
            return res.status(201).json(user);
        }
    }
    catch (error) {
        if (error.code === "P2002") {
            return res.status(400).json({ message: "Email already exists" });
        }
        console.error("Error in signup controller", error);
        return res.status(500).json({ message: error.message });
    }
};
export default signUpUser;
