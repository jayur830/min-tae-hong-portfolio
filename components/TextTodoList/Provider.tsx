// Package
import { useState } from "react";
import constate from "constate";

// Global

// Local

export type Props = {
	_texts: string[];
	onSetText: (sceneImgFiles: (string | null)[]) => void;
};

const useTextTodoList = (props: Props) => {
	const [texts, setTexts] = useState<string[]>(props._texts);
	return {
		texts,
		setTexts,
		props,
	};
};

const [Provider, useTexts, useSetTexts, useProps] = constate(
	useTextTodoList,
	(value) => value.texts,
	(value) => value.setTexts,
	(value) => value.props
);

export { Provider, useTexts, useSetTexts, useProps };
