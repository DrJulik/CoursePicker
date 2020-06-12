import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";
import { motion } from "framer-motion";

const Login = () => {
	const { login, auth } = useContext(GlobalContext);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const { email, password } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		login(email, password);
	};

	// Redirect if logged in
	if (auth.isAuthenticated) {
		return <Redirect to="/dashboard" />;
	}

	return (
		<section
			className="container"
			style={{
				height: "80vh",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<motion.div
				initial={{ opacity: 0, y: -1200 }}
				animate={{ opacity: 1, y: 0 }}
				style={{
					background: "rgba(208, 231, 225, 0.5)",
					padding: "100px",
					boxShadow: "#ccc 1px 1px 4px",
				}}
			>
				<h1 className="large text-primary">Sign In</h1>
				<p className="lead">
					<i className="fas fa-user"></i> Sign Into Your Account
				</p>
				<form className="form" onSubmit={(e) => onSubmit(e)}>
					<div className="form-group">
						<input
							type="email"
							placeholder="Email Address"
							name="email"
							required
							value={email}
							onChange={(e) => {
								onChange(e);
							}}
						/>
					</div>
					<div className="form-group">
						<input
							type="password"
							placeholder="Password"
							name="password"
							minLength="6"
							required
							value={password}
							onChange={(e) => {
								onChange(e);
							}}
						/>
					</div>

					<input type="submit" className="btn btn-primary" value="Login" />
				</form>
				<p className="my-1">
					Don't Have an Account? <Link to="/register">Register</Link>
				</p>
			</motion.div>
		</section>
	);
};

export default Login;
