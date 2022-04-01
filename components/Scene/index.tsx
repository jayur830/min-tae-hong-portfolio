// Package
import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

// Global

// Local
import { Props, Provider, useAnimateClass, useIndex, useProps, useSetAnimateClass, useSetIndex } from "./Provider";

const Consumer = () => {
	const { scenes, max, onClose } = useProps();
	const index = useIndex();
	const setIndex = useSetIndex();
	const animateClass = useAnimateClass();
	const setAnimateClass = useSetAnimateClass();

	return (
		<div className={"scene-background animate__animated animate__" + animateClass}>
			<div>
				<div>
					<div>
						<div
							className="close"
							onClick={() => {
								setAnimateClass("fadeOut");
								setTimeout(onClose, 500);
							}}>
							&times;
						</div>
						<div className="left">
							<FontAwesomeIcon icon={faChevronLeft} className={index === 0 ? "disable" : ""} onClick={() => (index === 0 ? null : setIndex(index - 1))} />
						</div>
						<div className="content">
							<Image
								src={"/api/file/" + scenes[index].filename}
								className={scenes[index].width > scenes[index].height ? "horizontal" : "vertical"}
								width={scenes[index].width}
								height={scenes[index].height}
								draggable={false}
								alt="Scene Image"
							/>
						</div>
						<div className="right">
							<FontAwesomeIcon icon={faChevronRight} className={index === max - 1 ? "disable" : ""} onClick={() => (index === max - 1 ? null : setIndex(index + 1))} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const Scene = (props: Props) => (
	<Provider {...props}>
		<Consumer />
	</Provider>
);

export default Scene;
