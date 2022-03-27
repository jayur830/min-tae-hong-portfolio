// Package
import constate from "constate";
import { useState } from "react";

// Global

// Local

export type Props = {
	scenes: {
		filename: string;
		width: number;
		height: number;
	}[];
	sceneIndex: number;
	max: number;
	onClose: () => void;
};

const useScene = (props: Props) => {
	const [index, setIndex] = useState(props.sceneIndex);
	const [animateClass, setAnimateClass] = useState<"fadeIn" | "fadeOut">("fadeIn");

	return {
		index,
		setIndex,
		animateClass,
		setAnimateClass,
		props,
	};
};

const [Provider, useIndex, useSetIndex, useAnimateClass, useSetAnimateClass, useProps] = constate(
	useScene,
	(value) => value.index,
	(value) => value.setIndex,
	(value) => value.animateClass,
	(value) => value.setAnimateClass,
	(value) => value.props
);

export { Provider, useIndex, useSetIndex, useAnimateClass, useSetAnimateClass, useProps };
