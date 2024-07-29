// import React from "react";
import { Link } from "react-router-dom";
import "./BottomNav.css";

const BottomNav = () => {
	return (
		<nav className="bottom-nav">
			<ul className="bottom-nav-links">
				<li className="nav-link">
					<Link to="/tournaments">Tournaments</Link>
				</li>
				<li className="nav-link">
					<Link to="/settings">Settings</Link>
				</li>
			</ul>
		</nav>
	);
};

export default BottomNav;
