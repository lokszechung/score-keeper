export {};
// export const signupUser = async (req: Request, res: Response) => {
// 	try {
// 		const { firstName, lastName, email, password, confirmPassword } = req.body;
// 		if (!firstName || !lastName || !email || !password || !confirmPassword) {
// 			return res.status(400).json({ message: "All fields are required" });
// 		}
// 		if (password !== confirmPassword) {
// 			return res.status(400).json({ message: "Passwords do not match" });
// 		}
// 		const user = await prisma.user.findUnique({ where: { email } });
// 		if (user) {
// 			return res.status(400).json({ message: "Email already exists" });
// 		}
// 		const salt = await bcryptjs.genSalt(10);
// 		const hashedPassword = await bcryptjs.hash(password, salt);
// 		const newUser = await prisma.user.create({
// 			data: {
// 				firstName,
// 				lastName,
// 				email,
// 				password: hashedPassword,
// 			},
// 		});
// 		if (newUser) {
// 			res.status(201).json({
// 				id: newUser.id,
// 				firstName: newUser.firstName,
// 				lastName: newUser.lastName,
// 				email: newUser.email,
// 				createdAt: newUser.createdAt,
// 			});
// 		} else {
// 			res.status(400).json({ error: "Invalid user data" });
// 		}
// 	} catch (error) {
// 		console.error("Error in signup controller", error);
// 		res.status(500).json({ error: "Internal server error" });
// 	}
// };
// export const loginUser = async (req: Request, res: Response) => {
// 	try {
// 		const { email, password } = req.body;
// 		if (!email || !password) {
// 			return res.status(400).json({ message: "All fields are required" });
// 		}
// 		const user = await prisma.user.findUnique({ where: { email } });
// 		if (!user) {
// 			return res.status(400).json({ message: "Invalid credentials" });
// 		}
// 		const passwordMatch = await bcryptjs.compare(password, user.password);
// 		if (!passwordMatch) {
// 			return res.status(400).json({ message: "Invalid credentials" });
// 		}
// 		generateToken(user.id, res);
// 		res.status(200).json({
// 			id: user.id,
// 			firstName: user.firstName,
// 			lastName: user.lastName,
// 			email: user.email,
// 			createdAt: user.createdAt,
// 		});
// 	} catch (error) {
// 		console.error("Error in login controller", error);
// 		res.status(500).json({ error: "Internal server error" });
// 	}
// };
// export const logoutUser = async (req: Request, res: Response) => {
// 	try {
// 		res.clearCookie("jwt");
// 		res.status(200).json({ message: "Logged out successfully" });
// 	} catch (error) {
// 		console.error("Error in logout controller", error);
// 		res.status(500).json({ error: "Internal server error" });
// 	}
// };
// export const getMeUser = async (req: Request, res: Response) => {
// 	try {
// 		const user = await prisma.user.findUnique({
// 			where: { id: req.user.id },
// 			select: {
// 				id: true,
// 				firstName: true,
// 				lastName: true,
// 			},
// 		});
// 		if (!user) {
// 			return res.status(404).json({ error: "User not found" });
// 		}
// 		res.status(200).json(user);
// 	} catch (error) {
// 		console.error("Error in getMe controller", error);
// 		res.status(500).json({ error: "Internal server error" });
// 	}
// };
