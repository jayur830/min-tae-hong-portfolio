import React, { useMemo, useState } from "react";
import { NextPage } from "next";
import { useSelector } from "react-redux";
import Image from "next/image";

import Scene from "../../components/Scene";
import YearBlock from "../../components/YearBlock";
import SceneSlide from "../../components/SceneSlide";
import BlackButton from "../../components/BlackButton";
import VideoModal from "../../components/VideoModal";

const Movies: NextPage = () => {
    const moviesState = useSelector((state: any) => state.movies);

    const [moviesScene, setMoviesScene] = useState({
        year: "",
        moviesIndex: -1,
        sceneIndex: -1,
        max: -1
    });
    const [moviesVideo, setMoviesVideo] = useState<{ filename: string, width: number, height: number } | null>(null);

    const years = useMemo(() => {
        const years = Object.keys(moviesState);
        years.sort((a, b) => a < b ? 1 : -1);
        return years;
    }, [moviesState]);

    return (
        <section className="movies">
            {years.map((year, i) => (
                <YearBlock key={i} year={year}>
                    {(moviesState[year] as any[]).map((obj: any, j: number) => (
                        <div key={j} className="movies-block">
                            {obj.img && obj.img.filename !== "" ? <Image src={"/" + obj.img.filename} width={obj.img.width} height={obj.img.height} draggable={false} alt="Index Content Image" /> : null}
                            <div>
                                {obj.video ? <BlackButton onClick={() => setMoviesVideo({ ...obj.video })}>VIDEO</BlackButton> : null}
                                <h3 className="font-smoothing">{obj.title}</h3>
                                <div className="font-smoothing">감독: {obj.director}</div>
                                {obj.actors.length === 0 ? null : <div className="font-smoothing">출연: {obj.actors.join(", ")}</div>}
                                {obj.awards.length > 0 ? <ul>{obj.awards.map((award: string, k: number) => <li key={k} className="font-smoothing">{award}</li>)}</ul> : null}
                            </div>
                            {obj.scenes.length === 0 ? null :
                                <SceneSlide
                                    type="movies"
                                    year={year}
                                    i={j}
                                    scenePage={obj.scenePage}
                                    scenes={obj.scenes}
                                    setScene={setMoviesScene} />}
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
            {moviesVideo ? <VideoModal src={moviesVideo} onClose={() => setMoviesVideo(null)} /> : null}
        </section>
    );
};

export default Movies;