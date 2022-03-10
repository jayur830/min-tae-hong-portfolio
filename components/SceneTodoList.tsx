import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const SceneTodoList: (props: { scenes: any[], onSetScene: (sceneImgFiles: (File | null)[]) => void }) => JSX.Element = ({ scenes, onSetScene }) => {
    const [files, setFiles] = useState<(File | null)[]>(scenes.map(() => null));

    return (
        <div className="scene-todo-list">
            {files.map((file, i) => (
                <div key={i}>
                    <input type="file" onChange={(e: any) => {
                        const _files = files.concat();
                        _files[i] = e.target.files[0];
                        onSetScene(_files);
                        setFiles(_files);
                    }} />
                    <span className="times" onClick={() => {
                        const _files = files.concat();
                        _files.splice(i, 1);
                        onSetScene(_files);
                        setFiles(_files);
                    }}>&times;</span>
                </div>
            ))}
            <div>
                <FontAwesomeIcon size="1x" icon={faPlus} onClick={() => {
                    const _files = files.concat();
                    _files.push(null);
                    onSetScene(_files);
                    setFiles(_files);
                }} />
            </div>
        </div>
    );
};

export default SceneTodoList;