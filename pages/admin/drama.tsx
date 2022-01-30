import React, { useState } from "react";
import { NextPage } from "next";
import { useSelector } from "react-redux";
import Image from "next/image";

import Scene from "../../components/Scene";
import YearBlock from "../../components/YearBlock";
import SceneSlide from "../../components/SceneSlide";

const Drama: NextPage = () => {
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
                <YearBlock key={i} year={year}>
                    {(dramaState[year] as any[]).map((obj: any, j: number) => (
                        <div key={j} className="drama-block">
                            {obj.img.filename ? <Image src={"/" + obj.img.filename} width={obj.img.width} height={obj.img.height} draggable={false} /> : null}
                            <div>
                                <h3 className="font-smoothing">{obj.title}</h3>
                                <div className="font-smoothing">연출: {obj.director}</div>
                                <div className="font-smoothing">출연: {obj.actors.join(", ")}</div>
                                {obj.schedule ? <div className="font-smoothing">방송: {obj.schedule}</div> : null}
                            </div>
                            {obj.scenes.length === 0 ? null :
                                <SceneSlide
                                    type="drama"
                                    year={year}
                                    i={j}
                                    scenePage={obj.scenePage}
                                    scenes={obj.scenes}
                                    setScene={setDramaScene} />}
                        </div>
                    ))}
                </YearBlock>
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
