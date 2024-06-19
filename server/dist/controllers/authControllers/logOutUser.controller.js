const logOutUser = async (req, res) => {
    try {
        res.clearCookie("jwt");
        res.status(200).json({ message: "Logged out successfully" });
    }
    catch (error) {
        console.error("Error in logout controller", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
export default logOutUser;