import { useState } from "react";
import { Link } from "react-router-dom";
import { createTournamentService } from "../../../services/TournamentServices";
import { useAuthContext } from "../../../providers/AuthProvider";

const CreateTournamentView = () => {
	const { authUser } = useAuthContext();
	const [newTournamentFields, setNewTournamentFields] = useState({
		name: "",
		startDateTime: new Date(),
		format: "",
	});

	const handleInputChange = (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLSelectElement>
	) => {
		setNewTournamentFields({
			...newTournamentFields,
			[e.target.id]: e.target.value,
		});
	};

	const handleCreateTournament = async (
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault();
		console.log(newTournamentFields);
		const data = await createTournamentService(newTournamentFields);
	};

	const formats = [
		{ name: "Round Robin", value: "ROUND_ROBIN" },
		{ name: "League", value: "LEAGUE" },
		{ name: "Knock-Out", value: "KNOCK_OUT" },
		{ name: "Group Knock-Out", value: "GROUP_KNOCK_OUT" },
	];

	if (!authUser) {
		return (
			<>
				<h1>You must be logged in to create a tournament</h1>
				<Link to="/login">log in</Link>
			</>
		);
	}

	return (
		<>
			<h1>Create Tournament View</h1>{" "}
			<form onSubmit={handleCreateTournament}>
				<div>
					<label htmlFor="name">Tournament name:</label>
					<input
						type="text"
						id="name"
						name="name"
						// value={email}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div>
					<label htmlFor="name">Format:</label>
					<select
						id="format"
						name="format"
						onChange={handleInputChange}
						required
					>
						<option value="" disabled selected>
							Select a format
						</option>
						{formats.map((format) => (
							<option key={format.value} value={format.value}>
								{format.name}
							</option>
						))}
					</select>
				</div>
				<div>
					<label htmlFor="startDateTime">Date and Time:</label>
					<input
						type="datetime-local"
						id="startDateTime"
						name="startDateTime"
						onChange={handleInputChange}
						required
					/>
				</div>
				<button type="submit">Create</button>
			</form>
		</>
	);
};

export default CreateTournamentView;
