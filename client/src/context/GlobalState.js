import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

// initial state
const initialState = {
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

	// actions

	function deleteCourse(id) {
		dispatch({
			type: "DELETE_COURSE",
			payload: id,
		});
	}
	function addCourse(newCourse) {
		dispatch({
			type: "ADD_COURSE",
			payload: newCourse,
		});
	}

	return (
		<GlobalContext.Provider
			value={{
				pickedCourses: state.pickedCourses,
				deleteCourse,
				addCourse,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
