// Package
import React from "react";

// Global
import { Common } from "@root/types";
import { useCommon, useSetCommon } from "@contexts/Provider";

// Local

const DarkModeButton = () => {
	const common = useCommon();
	const setCommon = useSetCommon();

	return (
		<div className="dark-mode-btn">
			<span className="font-smoothing">{common.darkMode ? "Dark" : "Light"}</span>
			<div className="font-smoothing">
				<span
					style={{ transform: `translateX(${common.darkMode ? 11 : -12}px)` }}
					onClick={() =>
						setCommon((state: Common) => {
							const _common = { ...state };
							_common.darkMode = !_common.darkMode;
							return _common;
						})
					}
				/>
			</div>
		</div>
	);
};

export default DarkModeButton;
