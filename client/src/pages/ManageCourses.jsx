import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Row, Col, Table, ButtonGroup } from "react-bootstrap";
import { GlobalContext } from "../context/GlobalState";

const ManageCourses = () => {
	const { pickedCourses, deleteCourse } = useContext(GlobalContext);

	return (
		<Row className="mt-5">
			<Col>
				<Card>
					<Card.Header>My Courses</Card.Header>
					<Card.Body>
						{pickedCourses.length === 0 ? (
							<>
								<Card.Title>
									<h3 className="mt-3">
										You are currently not taking any courses!
									</h3>
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
										<th></th>
									</tr>
								</thead>
								<tbody>
									{pickedCourses.map(
										({
											id,
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
													<td>
														{chosenSection} <Button variant="warning">#</Button>
													</td>
													<td>{course_director}</td>
													<td className="text-right">
														<Button
															variant="danger"
															onClick={() => {
																deleteCourse(id);
															}}
														>
															X
														</Button>
													</td>
												</tr>
											);
										}
									)}
								</tbody>
							</Table>
						)}

						<ButtonGroup className="mt-3">
							<Link to="/" className="mr-3">
								<Button variant="success">Back to My Courses</Button>
							</Link>
							<Link to="/subjects" className="mr-3">
								<Button variant="info">View Available Courses</Button>
							</Link>
						</ButtonGroup>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	);
};

export default ManageCourses;
