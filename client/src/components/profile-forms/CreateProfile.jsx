import React, { useState, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";
import { Container } from "react-bootstrap";

const CreateProfile = ({ history }) => {
	const { createProfile, profileInfo } = useContext(GlobalContext);
	const [formData, setFormData] = useState({
		dob: "",
		contact_info: "",
		location: "",
		major: "",
		bio: "",
		twitter: "",
		facebook: "",
		linkedin: "",
		instagram: "",
		courses: [],
	});

	const [displaySocialInputs, toggleSocialInputs] = useState(false);

	const {
		location,
		bio,
		major,
		dob,
		contact_info,
		twitter,
		instagram,
		linkedin,
		facebook,
	} = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		createProfile(formData, history, profileInfo.profile ? true : false);
	};
	return (
		<>
			<Container
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
						padding: "100px",
						boxShadow: "#ccc 1px 1px 4px",
					}}
				>
					<h1 className="large text-primary">Create Your Profile</h1>
					<p className="lead">
						<i className="fas fa-user" /> Add some changes to your profile
					</p>
					<small>* = required field</small>
					<form className="form" onSubmit={onSubmit}>
						<div className="form-group">
							<select name="major" value={major} onChange={onChange}>
								<option>* Select You Current Major</option>
								<option value="Criminology">Criminology</option>
								<option value="Biology">Biology</option>
								<option value="Political Science">Political Science</option>
								<option value="Undeclared">Undeclared</option>
							</select>
							<small className="form-text">
								If you have not decided yet, choose Undeclared
							</small>
						</div>
						<div className="form-group">
							<input
								type="text"
								placeholder="Location"
								name="location"
								value={location}
								onChange={onChange}
							/>
							<small className="form-text">
								City & state/province suggested (eg. Toronto, ON)
							</small>
						</div>
						<div className="form-group">
							<input type="date" name="dob" value={dob} onChange={onChange} />
							<small className="form-text">You date of birth</small>
						</div>
						<div className="form-group">
							<textarea
								placeholder="A short bio of yourself"
								name="bio"
								value={bio}
								onChange={onChange}
							/>
							<small className="form-text">
								Tell everyone a little about yourself
							</small>
						</div>
						<div className="form-group">
							<textarea
								placeholder="Contact Info"
								name="contact_info"
								value={contact_info}
								onChange={onChange}
							/>
							<small className="form-text">
								Provide your preferred method of communication
							</small>
						</div>

						<div className="my-2">
							<button
								onClick={() => toggleSocialInputs(!displaySocialInputs)}
								type="button"
								className="btn btn-warning mb-3"
							>
								Add Social Network Links
							</button>
						</div>

						{displaySocialInputs && (
							<>
								<div className="form-group social-input">
									<i className="fab fa-twitter fa-2x" />
									<input
										type="text"
										placeholder="Twitter URL"
										name="twitter"
										value={twitter}
										onChange={onChange}
									/>
								</div>

								<div className="form-group social-input">
									<i className="fab fa-facebook fa-2x" />
									<input
										type="text"
										placeholder="Facebook URL"
										name="facebook"
										value={facebook}
										onChange={onChange}
									/>
								</div>

								<div className="form-group social-input">
									<i className="fab fa-linkedin fa-2x" />
									<input
										type="text"
										placeholder="Linkedin URL"
										name="linkedin"
										value={linkedin}
										onChange={onChange}
									/>
								</div>

								<div className="form-group social-input">
									<i className="fab fa-instagram fa-2x" />
									<input
										type="text"
										placeholder="Instagram URL"
										name="instagram"
										value={instagram}
										onChange={onChange}
									/>
								</div>
							</>
						)}

						<input type="submit" className="btn btn-success my-1 mr-3 btn-lg" />
						<Link className="btn btn-info my-1 btn-lg" to="/dashboard">
							Go Back
						</Link>
					</form>
				</div>
			</Container>
		</>
	);
};

export default withRouter(CreateProfile);
