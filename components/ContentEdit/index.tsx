import React, { useState } from "react";
import BlackButton from "../BlackButton";

type ContentEditProps = {
    contents: {
        label: string,
        component: JSX.Element | JSX.Element[]
    }[],
    onSubmit: () => boolean,
    onClose: () => void
};

const ContentEdit: (props: ContentEditProps) => JSX.Element = ({ contents, onSubmit, onClose }) => {
    const [animateClass, setAnimateClass] = useState("fadeIn");

    return (
        <div className={"content-edit animate__animated animate__" + animateClass}>
            <div className="container">
                <span className="times" onClick={() => {
                    setAnimateClass("fadeOut");
                    setTimeout(onClose, 500);
                }}>
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
                    <BlackButton onClick={() => {
                        if (onSubmit()) {
                            setAnimateClass("fadeOut");
                            setTimeout(onClose, 500);
                        }
                    }}>등록</BlackButton>
                    <BlackButton onClick={() => {
                        setAnimateClass("fadeOut");
                        setTimeout(onClose, 500);
                    }}>취소</BlackButton>
                </div>
            </div>
        </div>
    );
};

export default ContentEdit;