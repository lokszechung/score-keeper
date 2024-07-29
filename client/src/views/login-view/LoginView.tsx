import { useState } from "react";
import { loginService } from "../../services/AuthServices";
import { useAuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const LoginView = () => {
	const navigate = useNavigate();
	const { setAuthUser } = useAuthContext();
	const [loginFields, setLoginFields] = useState({
		email: "",
		password: "",
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLoginFields({ ...loginFields, [e.target.id]: e.target.value });
	};

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(loginFields);
		const data = await loginService(loginFields);
		if (!data) console.log("Error logging in");
		if (data) {
			setAuthUser(data);
			navigate("/settings");
		}
	};

	return (
		<>
			<h1>Login View</h1>

			<form onSubmit={handleLogin}>
				<div>
					<label htmlFor="email">Email:</label>
					<input
						type="email"
						id="email"
						name="email"
						// value={email}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div>
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						id="password"
						name="password"
						// value={password}
						onChange={handleInputChange}
						required
					/>
				</div>
				<button type="submit">Log In</button>
			</form>
		</>
	);
};

export default LoginView;
