// Package
import { useEffect, useState } from "react";
import constate from "constate";

// Global
import { Common } from "@root/types";

// Local

const useApp = () => {
	const [common, setCommon] = useState<Common>({
		title: "",
		headerTitle: "",
		darkMode: false,
		windowWidth: 0,
	});
	useEffect(() => {
		fetch("/api/common/data")
			.then(response => response.json())
			.then(data => {
				setCommon({
					title: data.title,
					headerTitle: data.headerTitle,
					darkMode: false,
					windowWidth: window.innerWidth,
				});
			});
	}, [setCommon]);

	return {
		common,
		setCommon,
	};
};

const [Provider, useCommon, useSetCommon] = constate(
	useApp,
	value => value.common,
	value => value.setCommon
);

export { Provider, useCommon, useSetCommon };
