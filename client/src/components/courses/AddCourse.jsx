import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router";
// import axios from "axios";

const AddCourse = ({ available, course, history }) => {
	const { addCourse } = useContext(GlobalContext);

	if (available) {
		return (
			<Button
				className="mr-3"
				onClick={async () => {
					const newCourse = {
						id: Math.floor(Math.random() * 1000000),
						title: course.title,
						shortcode: course.shortcode,
						department: course.department,
						credits: course.credits,
						course_director: course.course_director,
						description: course.description,
						sections: course.chosenSection,
						available: course.available,
					};

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
			<Button disabled variant="danger">
				This Course is currently not available
			</Button>
		);
	}
};

export default withRouter(AddCourse);
