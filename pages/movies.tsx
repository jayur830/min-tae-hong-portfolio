import React, { useState } from "react";
import { NextPage } from "next";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronLeft,
    faChevronRight
} from "@fortawesome/free-solid-svg-icons";

import Scene from "../components/Scene";
import YearBlock from "../components/YearBlock";

const Movies: NextPage = () => {
    const dispatch = useDispatch();
    const commonState = useSelector((state: any) => state.common);
    const moviesState = useSelector((state: any) => state.movies);

    const [moviesScene, setMoviesScene] = useState({
        year: "",
        moviesIndex: -1,
        sceneIndex: -1,
        max: -1
    });

    const years = Object.keys(moviesState);
    years.sort((a, b) => a < b ? 1 : -1);

    return (
        <section className="movies">
            {years.map((year, i) => (
                <YearBlock key={i} year={year}>
                    {(moviesState[year] as any[]).map((obj: any, j: number) => (
                        <div key={j} className="movies-block">
                            {obj.img.filename ? <Image src={"/" + obj.img.filename} width={obj.img.width} height={obj.img.height} draggable={false} /> : null}
                            <div>
                                {obj.video == null ? null : <input type="button" className="video-btn" value="VIDEO" />}
                                <h3 className="font-smoothing">{obj.title}</h3>
                                <div className="font-smoothing">감독: {obj.director}</div>
                                {obj.actors.length === 0 ? null : <div className="font-smoothing">출연: {obj.actors.join(", ")}</div>}
                                {obj.awards.length > 0 ? <ul>{obj.awards.map((award: string, k: number) => <li key={k} className="font-smoothing">{award}</li>)}</ul> : null}
                            </div>
                            {obj.scenes.length === 0 ? null : (
                                <div className="scenes">
                                    <div>
                                        <div>
                                            <FontAwesomeIcon
                                                icon={faChevronLeft}
                                                className={obj.scenePage === 0 ? "disable" : ""}
                                                onClick={() => obj.scenePage === 0 ? null : dispatch({
                                                    type: "DECREASE_MOVIES_SCENE_PAGE",
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
                                                        onClick={() => setMoviesScene({
                                                            year,
                                                            moviesIndex: j,
                                                            sceneIndex: obj.scenePage * (commonState.windowWidth > 1120 ? 5 : 3) + k,
                                                            max: obj.scenes.length
                                                        })} />
                                                </li>
                                            ))}
                                        </ul>
                                        <div>
                                            <FontAwesomeIcon
                                                icon={faChevronRight}
                                                className={obj.scenePage === Math.ceil(obj.scenes.length / (commonState.windowWidth > 1120 ? 5 : 3)) - 1 ? "disable" : ""}
                                                onClick={() => obj.scenePage === Math.ceil(obj.scenes.length / (commonState.windowWidth > 1120 ? 5 : 3)) - 1 ? null : dispatch({
                                                    type: "INCREASE_MOVIES_SCENE_PAGE",
                                                    payload: { year, i: j }
                                                })} />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </YearBlock>
            ))}
            {moviesScene.year !== ""
                && moviesScene.moviesIndex !== -1
                && moviesScene.sceneIndex !== -1
                && moviesScene.max !== -1 ?
                <Scene
                    scenes={moviesState[moviesScene.year][moviesScene.moviesIndex].scenes}
                    sceneIndex={moviesScene.sceneIndex}
                    max={moviesScene.max}
                    onClose={() => setMoviesScene({
                        year: "",
                        moviesIndex: -1,
                        sceneIndex: -1,
                        max: -1
                    })} /> :
                null}
        </section>
    );
};

export default Movies;
