import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const Scene: (props: {
    scenes: {
        filename: string,
        width: number,
        height: number
    }[],
    sceneIndex: number,
    max: number,
    onClose: () => void
}) => JSX.Element = ({
    scenes,
    sceneIndex,
    max,
    onClose
}) => {
    const [index, setIndex] = useState(sceneIndex);
    const [animateClass, setAnimateClass] = useState("fadeIn");

    return (
        <div className={"scene-background animate__animated animate__" + animateClass}>
            <div>
                <div>
                    <div>
                        <div className="close" onClick={() => {
                            setAnimateClass("fadeOut");
                            setTimeout(onClose, 500);
                        }}>
                            &times;
                        </div>
                        <div className="left">
                            <FontAwesomeIcon
                                icon={faChevronLeft}
                                className={index === 0 ? "disable" : ""}
                                onClick={() => index === 0 ? null : setIndex(index - 1)} />
                        </div>
                        <div className="content">
                            <img src={"/api/img/" + scenes[index].filename} className={scenes[index].width > scenes[index].height ? "horizontal" : "vertical"} alt="" />
                        </div>
                        <div className="right">
                            <FontAwesomeIcon
                                icon={faChevronRight}
                                className={index === max - 1 ? "disable" : ""}
                                onClick={() => index === max - 1 ? null : setIndex(index + 1)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Scene;