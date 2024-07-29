import {
	Dispatch,
	SetStateAction,
	createContext,
	useState,
	useEffect,
	useContext,
} from "react";
import axios from "axios";

export type AuthUserType = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
};

type AuthContextType = {
	authUser: AuthUserType | null;
	setAuthUser: Dispatch<SetStateAction<AuthUserType | null>>;
	isAuthLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
	authUser: null,
	setAuthUser: () => {},
	isAuthLoading: true,
});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
	return useContext(AuthContext);
};

export const AuthContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [authUser, setAuthUser] = useState<AuthUserType | null>(null);
	const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);

	useEffect(() => {
		const getAuthUser = async () => {
			try {
				const res = await axios.get("http://localhost:5005/api/auth/me");
				// if (!res.ok) {
				// 	throw new Error(res.data.message);
				// }
				setAuthUser(res.data);
				console.log(res.data);
			} catch (error) {
				console.log(error);
			} finally {
				setIsAuthLoading(false);
			}
		};

		getAuthUser();
	}, []);

	return (
		<AuthContext.Provider value={{ authUser, isAuthLoading, setAuthUser }}>
			{children}
		</AuthContext.Provider>
	);
};
