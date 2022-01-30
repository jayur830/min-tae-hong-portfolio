import React, { useState } from "react";
import { NextPage } from "next";
import { useSelector } from "react-redux";
import Image from "next/image";

import Scene from "../components/Scene";
import YearBlock from "../components/YearBlock";
import SceneSlide from "../components/SceneSlide";

const Theater: NextPage = () => {
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
                <YearBlock key={i} year={year}>
                    {(theaterState[year] as any[]).map((obj: any, j: number) => (
                        <div key={j} className="theater-block">
                            {obj.img.filename ? <Image src={"/" + obj.img.filename} width={obj.img.width} height={obj.img.height} draggable={false} /> : null}
                            <div>
                                <h3 className="font-smoothing">{obj.title}</h3>
                                <div className="font-smoothing">장소: {obj.theater}</div>
                                <div className="font-smoothing">{obj.schedule}</div>
                            </div>
                            {obj.scenes.length === 0 ? null :
                                <SceneSlide
                                    type="drama"
                                    year={year}
                                    i={j}
                                    scenePage={obj.scenePage}
                                    scenes={obj.scenes}
                                    setScene={setTheaterScene} />}
                        </div>
                    ))}
                </YearBlock>
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
