import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";

const Register = () => {
	const { setAlert, register, auth } = useContext(GlobalContext);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		password2: "",
	});

	const { name, email, password, password2 } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		if (password !== password2) {
			setAlert("Passwords do not match", "danger");
		} else {
			register({ name, email, password });
		}
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
			<div
				style={{
					background: "rgba(208, 231, 225, 0.5)",
					padding: "40px",
					boxShadow: "#ccc 1px 1px 4px",
				}}
			>
				<h1 className="large text-info">Sign Up</h1>
				<p className="lead">
					<i className="fas fa-user mb-3"></i> Create Your Account
				</p>
				<form className="form" onSubmit={(e) => onSubmit(e)}>
					<div className="form-group">
						<input
							type="text"
							placeholder="Name"
							name="name"
							value={name}
							onChange={(e) => {
								onChange(e);
							}}
						/>
					</div>
					<div className="form-group">
						<input
							type="email"
							placeholder="Email Address"
							name="email"
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
							value={password}
							onChange={(e) => {
								onChange(e);
							}}
						/>
					</div>
					<div className="form-group">
						<input
							type="password"
							placeholder="Confirm Password"
							name="password2"
							value={password2}
							onChange={(e) => {
								onChange(e);
							}}
						/>
					</div>
					<input
						type="submit"
						className="btn btn-primary mb-3"
						value="Register"
					/>
				</form>
				<p className="my-1">
					Already have an account? <Link to="/login">Sign In</Link>
				</p>
			</div>
		</section>
	);
};

export default Register;
