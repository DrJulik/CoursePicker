import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Row, Col, Table, ButtonGroup } from "react-bootstrap";
import { GlobalContext } from "../../context/GlobalState";
import Spinner from "../Spinner";
import Moment from "react-moment";
import { motion } from "framer-motion";

const Body = () => {
	const { getCurrentProfile, auth, profileInfo } = useContext(GlobalContext);

	useEffect(() => {
		getCurrentProfile();
	}, []);

	return auth.loading ? (
		<Spinner />
	) : (
		<>
			{profileInfo.profile && profileInfo.profile.courses !== null ? (
				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
					<h1 style={{ marginTop: "3rem" }}>This is your Dashboard!</h1>
					<Row className="mt-5">
						<Col>
							<Card>
								<Card.Header>My Courses</Card.Header>
								<Card.Body>
									{profileInfo.profile.courses.length === 0 ? (
										<>
											<Card.Title>
												<h3>You are currently not taking any courses!</h3>
											</Card.Title>
										</>
									) : (
										<Table striped bordered hover>
											<thead>
												<tr>
													<th>Course Title</th>
													<th>Shortcode</th>
													<th>Credits</th>
													<th>Section</th>
													<th>Course Director</th>
												</tr>
											</thead>
											<tbody>
												{profileInfo.profile.courses.map(
													({
														_id,
														title,
														shortcode,
														credits,
														course_director,
														sections,
													}) => {
														return (
															<tr key={_id}>
																<td>{title}</td>
																<td>{shortcode}</td>
																<td>{credits}</td>
																<td>{sections}</td>
																<td>{course_director}</td>
															</tr>
														);
													}
												)}
											</tbody>
										</Table>
									)}

									<ButtonGroup className="mt-3">
										<Link to="/subjects" className="mr-3">
											<Button variant="info">View Available Courses</Button>
										</Link>
										<Link to="/manage_courses">
											<Button variant="warning">Manage my Courses</Button>
										</Link>
									</ButtonGroup>
								</Card.Body>
							</Card>
						</Col>
					</Row>
					<Row className="mt-5">
						<Col>
							<div>
								<h3>Credits in Progress: </h3>
								<h4>
									<i>3</i>
								</h4>
							</div>
							<div>
								<h3>Current major: </h3>
								<h4>
									<i>{profileInfo.profile.major}</i>
								</h4>
							</div>
							<div>
								<h3>Location: </h3>
								<h4>
									<i>{profileInfo.profile.location}</i>
								</h4>
							</div>
						</Col>
						<Col>
							<div>
								<h3>Date of Birth: </h3>
								<h4>
									<i>
										<Moment format="YYYY/MM/DD">
											{profileInfo.profile.dob}
										</Moment>
									</i>
								</h4>
							</div>
							<div>
								<h3>Contact Info: </h3>
								<h4>
									<i>{profileInfo.profile.contact_info}</i>
								</h4>
							</div>
							<div>
								<h3>About Me: </h3>
								<h4>
									<i>{profileInfo.profile.bio}</i>
								</h4>
							</div>
						</Col>
						<Col>
							<Link to="/edit-profile">
								<Button variant="info" size="lg">
									Edit Profile
								</Button>
							</Link>
						</Col>
					</Row>
				</motion.div>
			) : (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ dalay: 1.5 }}
					style={{
						height: "80vh",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<h2 className="display-4 mt-5">
						It looks like you don't have a profile set up. Let's get that done!
					</h2>
					<Link to="/create_profile">
						<Button variant="info" size="lg">
							Create Profile
						</Button>
					</Link>
				</motion.div>
			)}
		</>
	);
};

export default Body;
