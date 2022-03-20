import React from "react";
import { Provider, useAnimateClass, useSetAnimateClass } from "./Provider";

type VideoModalProps = {
    src: {
        filename: string,
        width: number,
        height: number
    },
    onClose: () => void
}

const VideoModal: (props: VideoModalProps) => JSX.Element = ({ src, onClose }) => {
    const animateClass = useAnimateClass();
    const setAnimateClass = useSetAnimateClass();

    return (
        <div className={"video-modal-wrap animate__animated animate__" + animateClass}>
            <div className="container">
                <span className="times" onClick={() => {
                    setAnimateClass("fadeOut");
                    setTimeout(onClose, 500);
                }}>
                    &times;
                </span>
                <video autoPlay controls>
                    <source src={"/" + src.filename} />
                </video>
            </div>
        </div>
    );
};

export default (props: VideoModalProps) => (
    <Provider>
        <VideoModal {...props} />
    </Provider>
);