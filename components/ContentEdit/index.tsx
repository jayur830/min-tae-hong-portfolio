// Package
import React from "react";

// Global

// Local
import BlackButton from "../BlackButton";
import { ContentEditProps, Provider, useAnimateClass, useSetAnimateClass, useProps } from "./Provider";

const Consumer = () => {
	const { contents, onSubmit, onClose } = useProps();
	const animateClass = useAnimateClass();
	const setAnimateClass = useSetAnimateClass();

	return (
		<div className={"content-edit animate__animated animate__" + animateClass}>
			<div className="container">
				<span
					className="times"
					onClick={() => {
						setAnimateClass("fadeOut");
						setTimeout(onClose, 500);
					}}
				>
					&times;
				</span>
				<table className="content">
					<tbody>
						{contents.map(({ label, component }, i) => {
							return (
								<tr key={i}>
									<td>{label}</td>
									<td>{component}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
				<div className="btn-wrap">
					<BlackButton
						onClick={() => {
							if (onSubmit()) {
								setAnimateClass("fadeOut");
								setTimeout(onClose, 500);
							}
						}}
					>
						등록
					</BlackButton>
					<BlackButton
						onClick={() => {
							setAnimateClass("fadeOut");
							setTimeout(onClose, 500);
						}}
					>
						취소
					</BlackButton>
				</div>
			</div>
		</div>
	);
};

const ContentEdit = (props: ContentEditProps) => (
	<Provider {...props}>
		<Consumer />
	</Provider>
);

export default ContentEdit;
