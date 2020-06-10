import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";

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
		<section className="container">
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
		</section>
	);
};

export default Login;
