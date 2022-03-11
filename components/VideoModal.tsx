import React, { useState } from "react";

type VideoModalProps = {
    src: {
        filename: string,
        width: number,
        height: number
    },
    onClose: () => void
}

const VideoModal: (props: VideoModalProps) => JSX.Element = ({ src, onClose }) => {
    const [animateClass, setAnimateClass] = useState("fadeIn");

    return (
        <div className={"video-modal-wrap animate__animated animate__" + animateClass}>
            <div className="container">
                <span className="times" onClick={() => {
                    setAnimateClass("fadeOut");
                    setTimeout(onClose, 500);
                }}>
                    &times;
                </span>
                <video autoPlay controls style={{ width: src.width, height: src.height }}>
                    <source src={"/" + src.filename} />
                </video>
            </div>
        </div>
    );
};

export default VideoModal;