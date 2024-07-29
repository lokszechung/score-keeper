import { Link } from "react-router-dom";
import { useAuthContext } from "../../providers/AuthProvider";
import { logoutService } from "../../services/AuthServices";

const SettingsView = () => {
	const { authUser, setAuthUser } = useAuthContext();
	const { id, email, firstName, lastName } = authUser || {};

	// console.log(authUser);

	const handleLogout = async () => {
		await logoutService();
		setAuthUser(null);
	};

	return (
		<>
			<h1>Settings View</h1>
			{!authUser ? (
				<Link to="/login">log in</Link>
			) : (
				<>
					<p>id: {id}</p>
					<p>
						name: {firstName} {lastName}
					</p>
					<p>email: {email}</p>
					<button onClick={handleLogout}>logout</button>
				</>
			)}
		</>
	);
};

export default SettingsView;
