import React from "react";
import { NextPage } from "next";
import Image from "next/image";
import { useSelector } from "react-redux";

const Movies: NextPage = () => {
    const moviesState = useSelector((state: any) => state.movies);

    const years = Object.keys(moviesState);
    years.sort((a, b) => a < b ? 1 : -1);

    return (
        <section className="movies">
            {years.map((year, i) => (
                <div key={i} className="year-block">
                    <div>
                        <h2>{year}</h2>
                        <span className="hr-circle" />
                        <span className="hr-line" />
                        <span className="hr-circle" />
                    </div>
                    <div>
                        {(moviesState[year] as any[]).map((obj: any, j: number) => (
                            <div key={j} className="movies-block">
                                {/*<Image src={"/api/img/" + obj.img.filename} width={obj.img.width} height={obj.img.height} draggable={false} />*/}
                                <img src={"/api/img/" + obj.img.filename} width={obj.img.width} height={obj.img.height} draggable={false} alt="" />
                                <div>
                                    {obj.video == null ? null : <input type="button" className="video-btn" value="VIDEO" />}
                                    <h3>{obj.title}</h3>
                                    <div>감독: {obj.director}</div>
                                    <div>출연: {obj.actors.join(", ")}</div>
                                    {obj.awards.length > 0 ? <ul>{obj.awards.map((award: string, k: number) => <li key={k}>{award}</li>)}</ul> : null}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </section>
    );
};

export default Movies;
