// Package
import { useState } from "react";
import constate from "constate";

// Global

// Local

export type Props = {
	scenes: any[];
	onSetScene: (sceneImgFiles: (File | null)[]) => void;
};

const useSceneTodoList = (props: Props) => {
	const [files, setFiles] = useState<(File | null)[]>(props.scenes.map(() => null));
	return {
		files,
		setFiles,
		props,
	};
};

const [Provider, useFiles, useSetFiles, useProps] = constate(
	useSceneTodoList,
	(value) => value.files,
	(value) => value.setFiles,
	(value) => value.props
);

export { Provider, useFiles, useSetFiles, useProps };
