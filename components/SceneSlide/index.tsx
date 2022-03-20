import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { useCommon } from "../../pages/Provider";

type Props = {
    type: "movies" | "drama" | "theater",
    year: string,
    i: number,
    scenePage: number,
    scenes: any[],
    setScene: any
};

const SceneSlide: (props: Props) => JSX.Element = ({ type, year, i, scenePage, scenes, setScene }) => {
    const dispatch = useDispatch();
    const common = useCommon();

    return (
        <div className="scenes">
            <div>
                <div>
                    <FontAwesomeIcon
                        icon={faChevronLeft}
                        className={scenePage === 0 ? "disable" : ""}
                        onClick={() => scenePage === 0 ? null : dispatch({
                            type: `DECREASE_${type.toUpperCase()}_SCENE_PAGE`,
                            payload: { year, i }
                        })} />
                </div>
                <ul className="no-scrollbar">
                    {scenes.slice(scenePage * (common.windowWidth > 1120 ? 5 : 3), Math.min((scenePage + 1) * (common.windowWidth > 1120 ? 5 : 3), scenes.length)).map((scene: any, k: number) => (
                        <li key={k}>
                            <Image
                                src={"/" + scene.filename}
                                width={scene.width > scene.height ? 166 : scene.width * 200 / scene.height}
                                height={scene.width <= scene.height ? 200 : scene.height * 166 / scene.width}
                                onClick={() => setScene({
                                    year,
                                    [`${type}Index`]: i,
                                    sceneIndex: scenePage * (common.windowWidth > 1120 ? 5 : 3) + k,
                                    max: scenes.length
                                })}
                                alt="Scene Slide Image" />
                        </li>
                    ))}
                </ul>
                <div>
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        className={scenePage === Math.ceil(scenes.length / (common.windowWidth > 1120 ? 5 : 3)) - 1 ? "disable" : ""}
                        onClick={() => scenePage === Math.ceil(scenes.length / (common.windowWidth > 1120 ? 5 : 3)) - 1 ? null : dispatch({
                            type: `INCREASE_${type.toUpperCase()}_SCENE_PAGE`,
                            payload: { year, i }
                        })} />
                </div>
            </div>
        </div>
    );
};

export default SceneSlide;
