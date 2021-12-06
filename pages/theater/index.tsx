import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import css from "styled-jsx/css";
import Image from "next/image";
import { useSelector } from "react-redux";

const style = css`
    section.theater {
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
                
                &:last-child > div.theater-block {
                    margin: 10px 30px;
                    
                    > div {
                        text-align: left;
                        
                        h3 {
                            margin: 7px 0;
                        }
                    }
                }
            }
        }
    }
`;

type TheaterData = {
    title: string,
    theater: string,
    year: number,
    schedule: string,
    img: {
        filename: string,
        width: number,
        height: number
    }
}[];

const Theater: NextPage = () => {
    const theaterState = useSelector((state: any) => state.theater);

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
                                <Image src={"/api/img/" + obj.img.filename} width={obj.img.width} height={obj.img.height} draggable={false} />
                                <div>
                                    <h3>{obj.title}</h3>
                                    <div>장소: {obj.theater}</div>
                                    <div>{obj.schedule}</div>
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

export default Theater;
