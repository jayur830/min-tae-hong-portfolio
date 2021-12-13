import React, { useState } from "react";
import { NextPage } from "next";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronLeft,
    faChevronRight
} from "@fortawesome/free-solid-svg-icons";

import Scene from "../../components/Scene";

const Drama: NextPage = () => {
    const dispatch = useDispatch();
    const dramaState = useSelector((state: any) => state.drama);

    const [dramaScene, setDramaScene] = useState({
        year: "",
        dramaIndex: -1,
        sceneIndex: -1,
        max: -1
    });

    const years = Object.keys(dramaState);
    years.sort((a, b) => a < b ? 1 : -1);

    return (
        <section className="drama">
            {years.map((year, i) => (
                <div key={i} className="year-block">
                    <div>
                        <h2>{year}</h2>
                        <span className="hr-circle" />
                        <span className="hr-line" />
                        <span className="hr-circle" />
                    </div>
                    <div>
                        {(dramaState[year] as any[]).map((obj: any, j: number) => (
                            <div key={j} className="drama-block">
                                {/*<Image src={"/api/img/" + obj.img.filename} width={obj.img.width} height={obj.img.height} draggable={false} />*/}
                                <img src={"/api/img/" + obj.img.filename} width={obj.img.width} height={obj.img.height} draggable={false} alt="" />
                                <div>
                                    <h3 className="font-smoothing">{obj.title}</h3>
                                    <div className="font-smoothing">연출: {obj.director}</div>
                                    <div className="font-smoothing">출연: {obj.actors.join(", ")}</div>
                                    <div className="font-smoothing">방송: {obj.schedule}</div>
                                </div>
                                {obj.scenes.length === 0 ? null : (
                                    <div className="scenes">
                                        <div>
                                            <div>
                                                <FontAwesomeIcon
                                                    icon={faChevronLeft}
                                                    className={obj.scenePage === 0 ? "disable" : ""}
                                                    onClick={() => obj.scenePage === 0 ? null : dispatch({
                                                        type: "DECREASE_DRAMA_SCENE_PAGE",
                                                        payload: { year, i: j }
                                                    })} />
                                            </div>
                                            <ul className="no-scrollbar">
                                                {obj.scenes.slice(obj.scenePage * 5, Math.min((obj.scenePage + 1) * 5, obj.scenes.length)).map((scene: any, k: number) => (
                                                    <li key={k}>
                                                        <img
                                                            src={"/api/img/" + scene.filename}
                                                            alt=""
                                                            style={scene.width > scene.height ? { width: 166 } : { height: 200, width: "auto" }}
                                                            onClick={() => setDramaScene({
                                                                year,
                                                                dramaIndex: j,
                                                                sceneIndex: obj.scenePage * 5 + k,
                                                                max: obj.scenes.length
                                                            })} />
                                                    </li>
                                                ))}
                                            </ul>
                                            <div>
                                                <FontAwesomeIcon
                                                    icon={faChevronRight}
                                                    className={obj.scenePage === obj.scenePages - 1 ? "disable" : ""}
                                                    onClick={() => obj.scenePage === obj.scenePages - 1 ? null : dispatch({
                                                        type: "INCREASE_DRAMA_SCENE_PAGE",
                                                        payload: { year, i: j }
                                                    })} />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            {dramaScene.year !== ""
                && dramaScene.dramaIndex !== -1
                && dramaScene.sceneIndex !== -1
                && dramaScene.max !== -1 ?
                <Scene
                    scenes={dramaState[dramaScene.year][dramaScene.dramaIndex].scenes}
                    sceneIndex={dramaScene.sceneIndex}
                    max={dramaScene.max}
                    onClose={() => setDramaScene({
                        year: "",
                        dramaIndex: -1,
                        sceneIndex: -1,
                        max: -1
                    })} /> :
                null}
        </section>
    );
};

export default Drama;
