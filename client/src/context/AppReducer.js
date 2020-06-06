export default (state, action) => {
	switch (action.type) {
		case "DELETE_COURSE":
			return {
				...state,
				pickedCourses: state.pickedCourses.filter(
					(course) => course.id !== action.payload
				),
			};
		case "ADD_COURSE":
			return {
				...state,
				pickedCourses: [action.payload, ...state.pickedCourses],
			};
		default:
			return state;
	}
};
