import React from "react";
import { NextPage } from "next";
import Image from "next/image";

import Scene from "../../components/Scene";
import YearBlock from "../../components/YearBlock";
import SceneSlide from "../../components/SceneSlide";
import { Provider, useSetTheaterScene, useTheaters, useTheaterScene, useYears } from "./Provider";

const Theaters: NextPage = () => {
    const theaters = useTheaters();
    const theaterScene = useTheaterScene();
    const setTheaterScene = useSetTheaterScene();
    const years = useYears();

    return (
        <section className="theater">
            {years.map((year, i) => (
                <YearBlock key={i} year={year}>
                    {(theaters[year] as any[]).map((obj: any, j: number) => (
                        <div key={j} className="theater-block">
                            {obj.img && obj.img.filename !== "" ? <Image src={"/" + obj.img.filename} width={obj.img.width} height={obj.img.height} draggable={false} alt="Index Content Image" /> : null}
                            <div>
                                <h3 className="font-smoothing">{obj.title}</h3>
                                <div className="font-smoothing">장소: {obj.theater}</div>
                                <div className="font-smoothing">{obj.schedule}</div>
                            </div>
                            {obj.scenes.length === 0 ? null :
                                <SceneSlide
                                    type="theater"
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
                        scenes={theaters[theaterScene.year][theaterScene.theaterIndex].scenes}
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

export default () => (
    <Provider>
        <Theaters />
    </Provider>
);
