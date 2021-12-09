import React from "react";
import { NextPage } from "next";
import css from "styled-jsx/css";
import { useSelector } from "react-redux";
import Image from "next/image";

const style = css`
    section.drama {
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
                
                &:last-child > div.drama-block {
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

const Drama: NextPage = () => {
    const dramaState = useSelector((state: any) => state.drama);

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
                                <Image src={"/api/img/" + obj.img.filename} width={obj.img.width} height={obj.img.height} draggable={false} />
                                <div>
                                    <h3>{obj.title}</h3>
                                    <div>연출: {obj.director}</div>
                                    <div>출연: {obj.actors.join(", ")}</div>
                                    <div>방송: {obj.schedule}</div>
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

export default Drama;
