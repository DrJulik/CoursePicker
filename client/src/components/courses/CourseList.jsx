import React, { Component } from "react";
import axios from "axios";
import { Card, ListGroup, Container, Row, Col, Button } from "react-bootstrap";
import Course from "./Course";
import { motion } from "framer-motion";

class CourseList extends Component {
	state = {
		title: "",
		courses: [],
	};

	async componentDidMount() {
		const { id } = this.props.match.params;
		const res = await axios.get(`/api/subjects/${id}`);

		const subject = res.data;

		this.setState({
			title: subject.title,
			courses: subject.courses,
		});
	}

	render() {
		const { id: subjectId } = this.props.match.params;
		const { title, courses } = this.state;
		return (
			<Container>
				<Row className="mt-5">
					<Col>
						<Card>
							<Card.Body>
								<Row>
									<Col>
										<Card.Title>
											<h3>{title} Courses:</h3>
										</Card.Title>
										<motion.div
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
										>
											<ListGroup>
												{courses.map((course) => {
													return (
														<Course
															key={course.id}
															{...course}
															subjectId={subjectId}
														/>
													);
												})}
											</ListGroup>
										</motion.div>
									</Col>
								</Row>
							</Card.Body>
						</Card>
						<Button
							className="mt-3"
							onClick={() => {
								this.props.history.goBack();
							}}
						>
							Back
						</Button>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default CourseList;
