import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router";
// import axios from "axios";

const AddCourse = ({ available, course, history }) => {
	const { addCourse } = useContext(GlobalContext);

	if (available) {
		return (
			<Button
				onClick={async () => {
					const newCourse = {
						id: Math.floor(Math.random() * 1000000),
						title: course.title,
						shortcode: course.shortcode,
						department: course.department,
						credits: course.credits,
						course_director: course.course_director,
						description: course.description,
						chosenSection: course.chosenSection,
						available: course.available,
					};

					// const req = await axios.post("http://localhost:3000/pickedCourses", newCourse);

					addCourse(newCourse);

					history.push("/");
				}}
				variant="info"
			>
				Add {course.title} to my Course List{" "}
			</Button>
		);
	} else {
		return (
			<Button
				onClick={async () => {
					const newCourse = {
						id: Math.floor(Math.random() * 1000000),
						title: course.title,
						shortcode: course.shortcode,
						department: course.department,
						credits: course.credits,
						course_director: course.course_director,
						description: course.description,
						chosenSection: course.chosenSection,
						available: course.available,
					};

					// const req = await axios.post("http://localhost:3000/pickedCourses", newCourse);

					addCourse(newCourse);

					history.push("/");
				}}
				disabled
				variant="danger"
			>
				This Course is currently not available
			</Button>
		);
	}
};

export default withRouter(AddCourse);
