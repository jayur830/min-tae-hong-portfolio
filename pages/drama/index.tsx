import React from "react";
import { NextPage } from "next";
import { useSelector } from "react-redux";
import Image from "next/image";

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
        </section>
    );
};

export default Drama;
