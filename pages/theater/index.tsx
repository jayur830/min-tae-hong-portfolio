import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import css from "styled-jsx/css";
import Image from "next/image";

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
                    
                    p {
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
    const [data, setData] = useState({
        [new Date().getFullYear().toString()]: [
            {
                title: "",
                theater: "",
                schedule: "",
                img: {
                    filename: "",
                    width: 0,
                    height: 0
                }
            }
        ]
    });

    useEffect(() => {
        fetch("/api/theater")
            .then(data => data.json())
            .then((data: TheaterData) => {
                let _data: { [year: string]: any[] } = {};
                data.forEach(obj => {
                    const year = obj.year.toString();
                    if (!(year in _data)) _data[year] = [];
                    _data[year].push({
                        title: obj.title,
                        theater: obj.theater,
                        schedule: obj.schedule,
                        img: { ...obj.img }
                    });
                });
                setData(_data);
            });
    }, []);

    const years = Object.keys(data);
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
                        {data[year].map(obj => (
                            <div className="theater-block">
                                <Image src={"/api/img/" + obj.img.filename} width={obj.img.width} height={obj.img.height} draggable={false} />
                                <p>
                                    <h3>{obj.title}</h3>
                                    장소: {obj.theater}<br />
                                    {obj.schedule}
                                </p>
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
