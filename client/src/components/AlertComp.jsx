import React, { useContext } from "react";
import { Alert } from "react-bootstrap";
import { GlobalContext } from "../context/GlobalState";

const AlertComp = () => {
	const { alerts } = useContext(GlobalContext);

	return (
		alerts !== null &&
		alerts.length > 0 &&
		alerts.map((alert) => (
			<Alert key={alert.id} variant={alert.alertType}>
				{alert.msg}
			</Alert>
		))
	);
};

export default AlertComp;
