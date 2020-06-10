import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";

const PrivateRoute = ({ component: Component, ...rest }) => {
	const { auth } = useContext(GlobalContext);
	return (
		<Route
			{...rest}
			render={(props) =>
				!auth.isAuthenticated && !auth.loading ? (
					<Redirect to="/login" />
				) : (
					<Component {...props} />
				)
			}
		/>
	);
};

export default PrivateRoute;
