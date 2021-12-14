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

const Theater: NextPage = () => {
    const dispatch = useDispatch();
    const commonState = useSelector((state: any) => state.common);
    const theaterState = useSelector((state: any) => state.theater);

    const [theaterScene, setTheaterScene] = useState({
        year: "",
        theaterIndex: -1,
        sceneIndex: -1,
        max: -1
    });

    const years = Object.keys(theaterState);
    years.sort((a, b) => a < b ? 1 : -1);

    return (
        <section className="theater">
            {years.map((year, i) => (
                <div key={i} className="year-block">
                    <div>
                        <h2>{year}</h2>
                        <span className="hr-circle" />
                        <span className="hr-line" />
                        <span className="hr-circle" />
                    </div>
                    <div>
                        {(theaterState[year] as any[]).map((obj: any, j: number) => (
                            <div key={j} className="theater-block">
                                {/*<Image src={"/api/img/" + obj.img.filename} width={obj.img.width} height={obj.img.height} draggable={false} />*/}
                                <img src={"/api/img/" + obj.img.filename} width={obj.img.width} height={obj.img.height} draggable={false} alt="" />
                                <div>
                                    <h3 className="font-smoothing">{obj.title}</h3>
                                    <div className="font-smoothing">장소: {obj.theater}</div>
                                    <div className="font-smoothing">{obj.schedule}</div>
                                </div>
                                {obj.scenes.length === 0 ? null : (
                                    <div className="scenes">
                                        <div>
                                            <div>
                                                <FontAwesomeIcon
                                                    icon={faChevronLeft}
                                                    className={obj.scenePage === 0 ? "disable" : ""}
                                                    onClick={() => obj.scenePage === 0 ? null : dispatch({
                                                        type: "DECREASE_THEATER_SCENE_PAGE",
                                                        payload: { year, i: j }
                                                    })} />
                                            </div>
                                            <ul className="no-scrollbar">
                                                {obj.scenes.slice(obj.scenePage * (commonState.windowWidth > 1120 ? 5 : 3), Math.min((obj.scenePage + 1) * (commonState.windowWidth > 1120 ? 5 : 3), obj.scenes.length)).map((scene: any, k: number) => (
                                                    <li key={k}>
                                                        <img
                                                            src={"/api/img/" + scene.filename}
                                                            alt=""
                                                            style={commonState.windowWidth < 1120 ? { width: "calc(100% - 10px)" } : (scene.width > scene.height ? { width: 166 } : { height: 200, width: "auto" })}
                                                            onClick={() => setTheaterScene({
                                                                year,
                                                                theaterIndex: j,
                                                                sceneIndex: obj.scenePage * (commonState.windowWidth > 1120 ? 5 : 3) + k,
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
                                                        type: "INCREASE_THEATER_SCENE_PAGE",
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
            {theaterScene.year !== ""
                && theaterScene.theaterIndex !== -1
                && theaterScene.sceneIndex !== -1
                && theaterScene.max !== -1 ?
                    <Scene
                        scenes={theaterState[theaterScene.year][theaterScene.theaterIndex].scenes}
                        sceneIndex={theaterScene.sceneIndex}
                        max={theaterScene.max}
                        onClose={() => setTheaterScene({
                            year: "",
                            theaterIndex: -1,
                            sceneIndex: -1,
                            max: -1
                        })} /> :
                    null}
        </section>
    );
};

export default Theater;
