import React, { useState } from "react";

type ContentEditProps = {
    contents: {
        label: string,
        component: JSX.Element | JSX.Element[]
    }[],
    onSubmit: () => void,
    onClose: () => void
};

const ContentEdit: (props: ContentEditProps) => JSX.Element = ({ contents, onSubmit, onClose }) => {
    const [animateClass, setAnimateClass] = useState("fadeIn");

    return (
        <div className={"content-editData animate__animated animate__" + animateClass}>
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
                    <input type="button" defaultValue="등록" onClick={() => {
                        onSubmit();
                        setAnimateClass("fadeOut");
                        setTimeout(onClose, 500);
                    }} />
                    <input type="button" defaultValue="취소" onClick={() => {
                        setAnimateClass("fadeOut");
                        setTimeout(onClose, 500);
                    }} />
                </div>
            </div>
        </div>
    );
};

export default ContentEdit;