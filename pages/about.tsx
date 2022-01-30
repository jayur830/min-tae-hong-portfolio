import React, { BaseSyntheticEvent, SyntheticEvent, useState } from "react";
import { NextPage } from "next";
import Image from "next/image";

import { useDispatch, useSelector } from "react-redux";

import dayjs from "dayjs";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const About: NextPage = () => {
    const commonState = useSelector((state: any) => state.common);
    const aboutState = useSelector((state: any) => state.about);
    const dispatch = useDispatch();

    const [writeComment, setWriteComment] = useState(false);
    const [comment, setComment] = useState("");
    const [secret, setSecret] = useState(false);

    const postComment = () => {
        const payload = {
            comment,
            date: dayjs().format("YYYY.MM.DD HH:mm"),
            secret
        };
        fetch("/api/writeComment", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        dispatch({
            type: "ADD_ABOUT_COMMENT",
            payload
        });
        setComment("");
        setWriteComment(false);
    };

    const aboutImg = <div><Image src={"/" + aboutState.img.filename} width={aboutState.img.width} height={aboutState.img.height} draggable={false} /></div>;

    return (
        <section className="about">
            <div className="content">
                {commonState.windowWidth <= 1120 ? aboutImg : null}
                <div>
                    <div>
                        <table>
                            <tbody>
                                {aboutState.metadata.map((obj: any, i: number) => (
                                    <tr key={i}>
                                        <td className="font-smoothing">{obj.label}.</td>
                                        <td className="font-smoothing">{obj.value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {commonState.windowWidth > 1120 ? aboutImg : null}
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
                            <span className="comment-date font-smoothing">{obj.date}</span>
                        </div>
                        <div className={(obj.secret ? "secret" : "") + " font-smoothing"}>
                            {obj.secret ? "비밀 댓글입니다." : obj.comment}
                        </div>
                    </div>
                ))}
                {writeComment ? (
                    <div key="comment-new" className="comment-block">
                        <div>
                            <FontAwesomeIcon size="1x" icon={faUserCircle} style={{
                                position: "relative",
                                left: -10,
                                width: 40
                            }} />
                            <span className="hr-circle" />
                            <span className="hr-line" />
                            <span className="hr-circle" />
                        </div>
                        <div>
                            <input type="text" placeholder="댓글을 입력하세요." onKeyUp={(e: any) => {
                                if (e.key === "Enter") postComment();
                                else setComment(e.target.value);
                            }} autoFocus={true} />
                        </div>
                        <div>
                            <input type="button" value="취소" onClick={() => setWriteComment(false)} />
                            <input type="button" value="등록" onClick={postComment} />
                        </div>
                    </div>
                ) : null}
                <input type="button" value="댓글 쓰기" onClick={() => setWriteComment(true)} />
            </div>
        </section>
    );
};

export default About;
