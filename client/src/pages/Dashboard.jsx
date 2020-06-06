import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Row, Col, Table, ButtonGroup } from "react-bootstrap";
import { GlobalContext } from "../context/GlobalState";

const Body = () => {
	const { pickedCourses } = useContext(GlobalContext);

	// const creditSum = pickedCourses.map((course) => {
	// 	return course.credits++;
	// });
	// console.log(creditSum);
	return (
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
										{pickedCourses.map(
											({
												title,
												shortcode,
												credits,
												course_director,
												chosenSection,
											}) => {
												return (
													<tr>
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
		</>
	);
};

export default Body;
