import React from "react";
import { NextPage } from "next";
import css from "styled-jsx/css";
import Image from "next/image";
import { useSelector } from "react-redux";

const style = css`
    section.movies {
        div.year-block {
            width: 1000px;
            margin: 10px auto 50px auto;
            padding: 15px 0;
            
            > div {
                &:first-child {
                    text-align: left;
                    
                    h2 {
                        display: inline-block;
                        margin-right: 10px;
                    }
                    
                    span {
                        &.hr-circle {
                            position: relative;
                            top: -5px;
                            display: inline-block;
                            background-color: transparent;
                            width: 8px;
                            height: 8px;
                            border: 1px solid #a5a5a5;
                            border-radius: 10px;
                            margin: 0 5px;
                        }
                        
                        &.hr-line {
                            position: relative;
                            top: -8.5px;
                            display: inline-block;
                            background-color: transparent;
                            width: calc(100% - 106px);
                            height: 0.5px;
                            border-top: 1px solid #a5a5a5;
                        }
                    }
                }
                
                &:last-child > div.movies-block {
                    margin: 10px 30px 100px;
                    
                    > div {
                        position: relative;
                        text-align: left;
                        
                        > input[type=button].video-btn {
                            position: absolute;
                            right: 0;
                            font: 18px 'HeirofLight Bold';
                            background-color: black;
                            color: white;
                            border: 1px solid black;
                            padding: 5px 20px;
                            cursor: pointer;
                            transition: background-color 0.15s, color 0.15s;
                            
                            &:hover {
                                background-color: white;
                                color: black;
                            }
                            
                            &:active {
                                background-color: #dedede;
                                color: black;
                            }
                        }
                                                
                        h3 {
                            margin: 7px 0;
                        }
                        
                        ul {
                            list-style-type: none;
                            margin: 15px 0;
                            padding: 0;
                        }
                    }
                }
            }
        }
    }
`;

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
                                <Image src={"/api/img/" + obj.img.filename} width={obj.img.width} height={obj.img.height} draggable={false} />
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
            <style jsx>{style}</style>
        </section>
    );
};

export default Movies;
