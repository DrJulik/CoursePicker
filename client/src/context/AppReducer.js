export default (state, action) => {
	switch (action.type) {
		// Alerts
		case "SET_ALERT":
			return {
				...state,
				alerts: [...state.alerts, action.payload],
			};
		case "REMOVE_ALERT":
			return {
				...state,
				alerts: state.alerts.filter((alert) => alert.id !== action.payload),
			};

		// AUTH
		case "REGISTER_SUCCESS":
		case "LOGIN_SUCCESS":
			localStorage.setItem("token", action.payload.token);
			return {
				...state,
				auth: {
					...state.auth,
					...action.payload,
					isAuthenticated: true,
					loading: false,
				},
			};
		case "REGISTER_FAIL":
		case "AUTH_ERROR":
		case "LOGIN_FAIL":
		case "LOGOUT":
			localStorage.removeItem("token");
			return {
				...state,
				auth: {
					token: null,
					isAuthenticated: false,
					loading: false,
				},
			};
		case "USER_LOADED":
			return {
				...state,
				auth: {
					...state.auth,
					isAuthenticated: true,
					loading: false,
					user: action.payload,
				},
			};

		// PROFILES STUFF

		case "CLEAR_PROFILE":
			return {
				...state,
				profileInfo: {
					...state.profileInfo,
					profile: null,
					loading: false,
				},
			};
		case "GET_PROFILE":
		case "ADD_COURSE":
		case "DELETE_COURSE":
			return {
				...state,
				profileInfo: {
					...state.profileInfo,
					profile: action.payload,
					loading: false,
				},
			};

		case "PROFILE_ERROR":
			return {
				...state,
				profileInfo: {
					...state.profileInfo,
					error: action.payload,
					loading: false,
				},
			};

		default:
			return state;
	}
};
