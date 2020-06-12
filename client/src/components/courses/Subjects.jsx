import React, { useState, useEffect } from "react";
import axios from "axios";
import {
	Card,
	ListGroup,
	ListGroupItem,
	Container,
	Row,
	Col,
	Button,
} from "react-bootstrap";

const Courses = (props) => {
	const [subjects, setSubjects] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const res = await axios.get(`/api/subjects`);

			setSubjects(res.data);
		}
		fetchData();
	}, []);

	const openCourses = (_id) => props.history.push(`/subjects/${_id}`);

	return (
		<Container>
			<Row className="mt-5">
				<Col>
					<Card>
						<Card.Header>
							<h3>Available Courses:</h3>
						</Card.Header>
						<Card.Body>
							<Row>
								<Col>
									<Card.Title>Subjects:</Card.Title>
									<ListGroup>
										{subjects.map((subject) => {
											return (
												<ListGroupItem
													key={subject._id}
													action
													onClick={openCourses.bind(this, subject._id)}
												>
													{subject.title}
												</ListGroupItem>
											);
										})}
									</ListGroup>
								</Col>
							</Row>
						</Card.Body>
					</Card>
					<Button
						className="mt-3"
						onClick={() => {
							props.history.goBack();
						}}
					>
						Back
					</Button>
				</Col>
			</Row>
		</Container>
	);
};

export default Courses;
