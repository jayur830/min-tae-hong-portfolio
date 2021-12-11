import React from "react";
import { NextPage } from "next";
import Image from "next/image";
import { useSelector } from "react-redux";

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
                                {/*<Image src={"/api/img/" + obj.img.filename} width={obj.img.width} height={obj.img.height} draggable={false} />*/}
                                <img src={"/api/img/" + obj.img.filename} width={obj.img.width} height={obj.img.height} draggable={false} alt="" />
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
        </section>
    );
};

export default Theater;
