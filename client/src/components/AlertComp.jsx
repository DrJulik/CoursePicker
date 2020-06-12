import React, { useContext } from "react";

import { GlobalContext } from "../context/GlobalState";
import { motion, AnimatePresence } from "framer-motion";

const AlertComp = () => {
	const { alerts } = useContext(GlobalContext);

	return (
		alerts !== null &&
		alerts.length > 0 &&
		alerts.map((alert) => (
			<AnimatePresence>
				<motion.div
					initial={{ opacity: 0, x: 1200 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0 }}
					key={alert.id}
					className={`alert alert-${alert.alertType}`}
				>
					{alert.msg}
				</motion.div>
			</AnimatePresence>
		))
	);
};

export default AlertComp;
