import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import { v4 as uuidv4 } from "uuid";
import Axios from "axios";
import setAuthToken from "../utils/setAuthToken";

// initial state
const initialState = {
	alerts: [],
	auth: {
		token: localStorage.getItem("token"),
		isAuthenticated: null,
		loading: true,
		user: null,
	},
	profileInfo: {
		profile: null,
		profiles: [],
		loading: true,
		error: {},
	},
	pickedCourses: [
		{
			id: 1,
			title: "Introduction to Criminology",
			shortcode: "Crim 101",
			department: "Criminology",
			credits: 3,
			course_director: "Dr.Proffessorsson",
			description:
				"This is a very good criminology course. This is a very good criminology course.This is a very good criminology course.",
		},
	],
};

// Creating context
export const GlobalContext = createContext(initialState);

// Provider

export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	// ACTIONS

	// ALERTS
	function setAlert(msg, alertType, timeout = 3000) {
		const id = uuidv4();
		dispatch({
			type: "SET_ALERT",
			payload: { msg, alertType, id },
		});

		setTimeout(() => dispatch({ type: "REMOVE_ALERT", payload: id }), timeout);
	}

	// AUTH
	async function register(name, email, password) {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const body = JSON.stringify(name, email, password);

		try {
			const res = await Axios.post("/api/users", body, config);

			dispatch({
				type: "REGISTER_SUCCESS",
				payload: res.data,
			});
			dispatch(loadUser());
		} catch (err) {
			const errors = err.response.data.errors;

			if (errors) {
				errors.forEach((error) => setAlert(error.msg, "danger"));
			}
			dispatch({
				type: "REGISTER_FAIL",
			});
		}
	}

	async function loadUser() {
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}

		try {
			const res = await Axios.get("/api/auth");

			dispatch({
				type: "USER_LOADED",
				payload: res.data,
			});
		} catch (err) {
			dispatch({
				type: "AUTH_ERROR",
			});
		}
	}

	// Login user
	async function login(email, password) {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const body = JSON.stringify({ email, password });

		try {
			const res = await Axios.post("/api/auth", body, config);

			dispatch({
				type: "LOGIN_SUCCESS",
				payload: res.data,
			});

			dispatch(loadUser());
		} catch (err) {
			const errors = err.response.data.errors;

			if (errors) {
				errors.forEach((error) => setAlert(error.msg, "danger"));
			}
			dispatch({
				type: "LOGIN_FAIL",
			});
		}
	}

	// logout / clear profile
	function logout() {
		dispatch({ type: "CLEAR_PROFILE" });
		dispatch({ type: "LOGOUT" });
	}

	// PROFILES

	// get current user profile
	async function getCurrentProfile() {
		try {
			const res = await Axios.get("/api/profile/me");

			dispatch({
				type: "GET_PROFILE",
				payload: res.data,
			});
		} catch (err) {
			dispatch({
				type: "PROFILE_ERROR",
				payload: {
					msg: err.response.statusText,
					status: err.response.status,
				},
			});
		}
	}

	async function createProfile(formData, history, edit = false) {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};

			const res = await Axios.post("/api/profile", formData, config);
			dispatch({
				type: "GET_PROFILE",
				payload: res.data,
			});
			setAlert(edit ? "Profile Updated" : "Profile Created", "success");

			if (!edit) {
				history.push("/dashboard");
			}
		} catch (err) {
			const errors = err.response.data.errors;

			if (errors) {
				errors.forEach((error) => setAlert(error.msg, "danger"));
			}
			dispatch({
				type: "PROFILE_ERROR",
				payload: {
					msg: err.response.statusText,
					status: err.response.status,
				},
			});
		}
	}

	// add course
	async function addCourse(newCourse, config) {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};

			const res = await Axios.put("/api/profile/courses", newCourse, config);
			dispatch({
				type: "ADD_COURSE",
				payload: res.data,
			});
			setAlert("Course added!", "success");
		} catch (err) {
			console.log(err);
			// dispatch({
			// 	type: "PROFILE_ERROR",
			// 	payload: {
			// 		msg: err.response.statusText,
			// 		status: err.response.status,
			// 	},
			// });
		}
	}

	// delete course

	async function deleteCourse(id) {
		try {
			const res = await Axios.delete(`/api/profile/courses/${id}`);

			dispatch({
				type: "DELETE_PROFILE",
				payload: res.data,
			});

			setAlert("Course Removed", "success");
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<GlobalContext.Provider
			value={{
				auth: state.auth,
				profileInfo: state.profileInfo,
				pickedCourses: state.pickedCourses,
				alerts: state.alerts,
				setAlert,
				register,
				loadUser,
				login,
				logout,
				getCurrentProfile,
				createProfile,
				addCourse,
				deleteCourse,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
