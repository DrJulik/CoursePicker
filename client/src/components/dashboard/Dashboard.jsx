import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Row, Col, Table, ButtonGroup } from "react-bootstrap";
import { GlobalContext } from "../../context/GlobalState";
import Spinner from "../Spinner";
import DashboardActions from "./DashboardActions";

const Body = () => {
	const { pickedCourses, getCurrentProfile, auth, profileInfo } = useContext(
		GlobalContext
	);

	useEffect(() => {
		getCurrentProfile();
	}, []);

	// const creditSum = pickedCourses.map((course) => {
	// 	return course.credits++;
	// });
	// console.log(creditSum);
	return auth.loading && profileInfo.profile === null ? (
		<Spinner />
	) : (
		<>
			{profileInfo.profile && profileInfo.profile.courses !== null ? (
				<>
					<Row className="mt-5">
						<Col>
							<h3>Credits in Progress: 3</h3>
						</Col>
					</Row>
					<Row className="mt-5">
						<Col>
							<Card>
								<Card.Header>My Courses</Card.Header>
								<Card.Body>
									{pickedCourses.length === 0 ? (
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
														id,
														title,
														shortcode,
														credits,
														course_director,
														chosenSection,
													}) => {
														return (
															<tr key={id}>
																<td>{title}</td>
																<td>{shortcode}</td>
																<td>{credits}</td>
																<td>{chosenSection}</td>
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
							<DashboardActions />
						</Col>
					</Row>
				</>
			) : (
				<>
					<h2 className="display-4 mt-5">
						It looks like you don't have a profile set up. Let's get that done!
					</h2>
					<Link to="/create_profile">
						<Button variant="info">Create Profile</Button>
					</Link>
				</>
			)}
		</>
	);
};

export default Body;
