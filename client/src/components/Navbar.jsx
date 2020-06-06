import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
	return (
		<Navbar bg="light" expand="lg">
			<Container>
				<h4 className="display-4">Welcome, User!</h4>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ml-auto">
						<Link to="/" className="nav-link">
							My Dashboard
						</Link>
						<Link to="/about" className="nav-link">
							About
						</Link>
						<Nav.Link href="#home">Log Out</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavBar;
