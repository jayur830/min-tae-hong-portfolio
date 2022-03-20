import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Props, Provider, useProps, useSetTexts, useTexts } from "./Provider";

const TextTodoList = () => {
    const { onSetText } = useProps();
    const texts = useTexts();
    const setTexts = useSetTexts();

    return (
        <div className="scene-todo-list">
            {texts.map((text, i) => (
                <div key={i}>
                    <input type="text" defaultValue={text} onKeyUp={(e: any) => {
                        const ts = texts.concat();
                        ts[i] = e.target.value;
                        onSetText(ts);
                        setTexts(ts);
                    }} />
                    <span className="times" onClick={() => {
                        const ts = texts.concat();
                        ts.splice(i, 1);
                        onSetText(ts);
                        setTexts(ts);
                    }}>&times;</span>
                </div>
            ))}
            <div>
                <FontAwesomeIcon size="1x" icon={faPlus} onClick={() => {
                    const ts = texts.concat();
                    ts.push("");
                    onSetText(ts);
                    setTexts(ts);
                }} />
            </div>
        </div>
    );
};

export default (props: Props) => (
    <Provider {...props}>
        <TextTodoList />
    </Provider>
);