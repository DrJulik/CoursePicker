import React from "react";

const About = () => {
	return (
		<div className="mt-5">
			<h2>About the app!</h2>
			<p>
				This is a full stack project, written from scratch with the MERN (Mongo,
				Express, React, Node) stack.
			</p>
			<p>
				Some of the functionality includes: user registration, profile creation,
				profile edit, adding and deleting a course.
			</p>
			<p>
				The React part is written 90% with functional components with Hooks,
				except where my brain decided to default to componentDidMount and I
				didn't want to go back and rewrite a perfectly good component.
			</p>
			<p>
				The backend features custom API, with routes for auth, users, profiles
				and subjects.
			</p>
			<p>
				I really didn't want to get bogged down with custom styling for the UI,
				so I used bootstrap to make quick work of it. Functionality was my
				priority here.
			</p>
		</div>
	);
};

export default About;
