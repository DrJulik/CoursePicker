import React, { Component } from "react";
import { Container, Row, Col, Table, Form, Button } from "react-bootstrap";
import axios from "axios";
import AddCourse from "./AddCourse";

export class CoursePage extends Component {
	state = {
		title: "",
		shortcode: "",
		department: "",
		credits: "",
		course_director: "",
		description: "",
		sections: [],
		chosenSection: "",
		available: true,
	};

	async componentDidMount() {
		const { id, subjectId } = this.props.match.params;
		const res = await axios.get(`http://localhost:3000/subjects/${subjectId}`);

		const course = res.data.courses[id - 1];

		this.setState({
			title: course.title,
			shortcode: course.shortcode,
			department: course.department,
			credits: course.credits,
			course_director: course.course_director,
			description: course.description,
			sections: course.sections,
			available: course.available,
		});
	}

	render(props) {
		const {
			title,
			shortcode,
			department,
			credits,
			course_director,
			description,
			sections,
			available,
		} = this.state;

		return (
			<Container>
				<Row className="mt-5">
					<Col>
						<h4 className="display-4">{title}</h4>
						<h5 className="display-5">Offered by department of {department}</h5>
						<h5> Course Director: {course_director}</h5>
						<p className="lead mt-5">Course Description:</p>
						<p className="lead"> {description}</p>
					</Col>
					<Col className="text-right mt-4">
						<h5>{credits} Credits</h5>
						<p>
							Shortcode: <h5 className="lead">{shortcode}</h5>
						</p>
						{sections ? (
							<Table className="mt-5" striped bordered hover>
								<thead>
									<tr>
										<th></th>
										<th>Code</th>
										<th>Time slot</th>
										<th>Professor</th>
										<th>Location</th>
									</tr>
								</thead>
								<tbody>
									{sections.map((section) => {
										return (
											<tr>
												<td>
													<Form.Check
														onChange={() => {
															this.setState({
																...this.state,
																chosenSection: section.code,
															});
														}}
														type="radio"
														aria-label="radio 1"
														name="sectionChoice"
														value={section.id}
													/>
												</td>
												<td>{section.code}</td>
												<td>{section.time}</td>
												<td>{section.professor}</td>
												<td>{section.location}</td>
											</tr>
										);
									})}
								</tbody>
							</Table>
						) : null}
					</Col>
				</Row>
				<Row className="flex">
					<AddCourse course={this.state} available={available} />
					<Button
						className="mt-3 mr-3 px-4 ml-auto"
						onClick={() => {
							this.props.history.goBack();
						}}
					>
						Back
					</Button>
				</Row>
			</Container>
		);
	}
}

export default CoursePage;
