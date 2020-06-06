import React from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Courses from "./pages/Subjects";
import Wrapper from "./components/Wrapper";
import CourseList from "./components/CourseList";
import CoursePage from "./components/CoursePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalState";
import ManageCourses from "./pages/ManageCourses";

function App() {
	return (
		<GlobalProvider>
			<Router>
				<Navbar />
				<Wrapper>
					<Switch>
						<Route exact path="/" component={Dashboard} />
						<Route exact path="/manage_courses" component={ManageCourses} />
						<Route exact path="/about" component={About} />
						<Route exact path="/subjects" component={Courses} />
						<Route exact path="/subjects/:id" component={CourseList} />
						<Route exact path="/:subjectId/:id" component={CoursePage} />
					</Switch>
				</Wrapper>
			</Router>
		</GlobalProvider>
	);
}

export default App;
