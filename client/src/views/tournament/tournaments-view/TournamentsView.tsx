import { Link } from "react-router-dom";
import { useAuthContext } from "../../../providers/AuthProvider";

const TournamentsView = () => {
	const { authUser } = useAuthContext();

	return (
		<>
			<h1>Tournamants View</h1>
			{authUser && <Link to="/new-tournament">create a tournament!</Link>}
		</>
	);
};

export default TournamentsView;
