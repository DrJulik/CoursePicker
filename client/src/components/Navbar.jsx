import React, { useContext, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import setAuthToken from "../utils/setAuthToken";

const NavBar = () => {
	const { loadUser, auth, logout } = useContext(GlobalContext);
	const { loading, isAuthenticated } = auth;
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	// THIS SHOULD BE IN THE APP COMPONENT. IT IS HERE BECAUSE I CAN'T USE CONTEXT INSIDE APP COMPONENT. I HOPE THIS WORKS.

	useEffect(() => {
		setAuthToken(localStorage.token);
		loadUser();
	}, []);

	const authLinks = (
		<Nav className="ml-auto">
			<Link to="/dashboard" className="nav-link">
				My Dashboard
			</Link>
			<Link to="/about" className="nav-link">
				About
			</Link>
			<Nav.Link onClick={logout} href="#!">
				Log Out
			</Nav.Link>
		</Nav>
	);

	const guestLinks = (
		<Nav className="ml-auto">
			<Link to="/login" className="nav-link">
				Log In
			</Link>
			<Link to="/about" className="nav-link">
				About
			</Link>
		</Nav>
	);

	return (
		<Navbar bg="light" expand="lg" className=" mb-3">
			<Container>
				<h5 className="display-5">
					{auth.user ? `Hello, ${auth.user.name}` : "Course Picker"}
				</h5>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					{!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavBar;
