import React from "react";
import { NextPage } from "next";
import Image from "next/image";

import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const About: NextPage = () => {
    const aboutState = useSelector((state: any) => state.about);

    return (
        <section className="about">
            <div>
                <div>
                    <div>
                        <table>
                            <tbody>
                            <tr>
                                <td colSpan={2}>{aboutState.name}</td>
                            </tr>
                            <tr>
                                <td>BIRTH.</td>
                                <td>{aboutState.birth}</td>
                            </tr>
                            <tr>
                                <td colSpan={2}><p>{aboutState.info}</p></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    <Image src={"/api/img/" + aboutState.img.filename} width={aboutState.img.width} height={aboutState.img.height} draggable={false} />
                </div>
            </div>
            <div className="comment">
                <h2>Comments</h2>
                {aboutState.comments.map((obj: { comment: string, date: string, secret: boolean }, i: number) => (
                    <div key={`comment-${i}`} className="comment-block">
                        <div>
                            <FontAwesomeIcon size="1x" icon={faUserCircle} style={{
                                position: "relative",
                                left: -10,
                                width: 40
                            }} />
                            <span className="hr-circle" />
                            <span className="hr-line" />
                            <span className="hr-circle" />
                            <span className="comment-date">{obj.date}</span>
                        </div>
                        <div className={obj.secret ? "secret" : ""}>
                            {obj.secret ? "비밀 댓글입니다." : obj.comment}
                        </div>
                    </div>
                ))}
                <input type="button" value="댓글 쓰기" />
            </div>
        </section>
    );
};

export default About;
