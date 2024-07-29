import { Routes, Route } from "react-router-dom";

import SettingsView from "./views/settings-view/SettingsView";
import BottomNav from "./components/bottomNav/BottomNav";
import LoginView from "./views/login-view/LoginView";
import TournamentsView from "./views/tournament/tournaments-view/TournamentsView";
import CreateTournamentView from "./views/tournament/create-tournament-view/CreateTournamentView";

import "./App.css";
// import { useAuthContext } from "./providers/AuthProvider";

function App() {
	return (
		<>
			<BottomNav />
			<Routes>
				<Route path="/tournaments" element={<TournamentsView />} />
				<Route path="/new-tournament" element={<CreateTournamentView />} />
				<Route path="/settings" element={<SettingsView />} />
				<Route path="/login" element={<LoginView />} />
			</Routes>
		</>
	);
}

export default App;
