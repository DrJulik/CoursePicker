import React from "react";
import { ListGroupItem, Row, Col } from "react-bootstrap";
import { withRouter } from "react-router";

const Course = ({ id, title, shortcode, department, subjectId, history }) => {
	const openCourse = (id) => history.push(`/${subjectId}/${id}`);

	return (
		<ListGroupItem action onClick={openCourse.bind(this, id)}>
			<Row>
				<Col>
					[{shortcode}] {title}
				</Col>
			</Row>
		</ListGroupItem>
	);
};

export default withRouter(Course);
