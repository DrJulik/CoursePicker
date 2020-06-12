import React, { useContext } from "react";
import { Container, ButtonGroup, Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import { motion } from "framer-motion";
const Landing = () => {
	const { auth } = useContext(GlobalContext);

	if (auth.isAuthenticated) {
		return <Redirect to="/dashboard" />;
	}
	return (
		<Container>
			<section className="landing">
				<motion.div
					initial={{ opacity: 0, x: -1200 }}
					animate={{ opacity: 1, x: 0 }}
					className="landing-inner"
				>
					<h1 className="x-large">Course Picker</h1>
					<p className="lead">
						Full stack application to choose and manage your courses! (It's
						fake, none of this is real. Courses are super made up.)
					</p>

					<ButtonGroup className="mt-4">
						<Link to="/register">
							<Button variant="warning" size="lg">
								Sign Up
							</Button>
						</Link>

						<Link to="/login" className="ml-3">
							<Button variant="info" size="lg">
								Login
							</Button>
						</Link>
					</ButtonGroup>
				</motion.div>
			</section>
		</Container>
	);
};

export default Landing;
