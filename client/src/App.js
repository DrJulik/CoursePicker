import React from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import About from "./pages/About";
import Courses from "./pages/Subjects";
import Wrapper from "./components/Wrapper";
import CourseList from "./components/CourseList";
import CoursePage from "./components/CoursePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalState";
import ManageCourses from "./pages/ManageCourses";
import Landing from "./pages/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import AlertComp from "./components/AlertComp";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import PrivateRoute from "./components/routing/PrivateRoute";

function App() {
	return (
		<GlobalProvider>
			<Router>
				<Navbar />
				<Wrapper>
					<AlertComp />
					<Switch>
						<Route exact path="/" component={Landing} />
						<Route exact path="/register" component={Register} />
						<Route exact path="/login" component={Login} />
						<PrivateRoute exact path="/dashboard" component={Dashboard} />
						<PrivateRoute
							exact
							path="/create_profile"
							component={CreateProfile}
						/>
						<PrivateRoute exact path="/edit-profile" component={EditProfile} />

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
