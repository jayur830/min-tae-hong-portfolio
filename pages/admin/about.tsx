import React, { BaseSyntheticEvent, SyntheticEvent, useState } from "react";
import { NextPage } from "next";
import Image from "next/image";

import { useDispatch, useSelector } from "react-redux";

import dayjs from "dayjs";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

import DatePicker from "react-datepicker";

const About: NextPage = () => {
    const aboutState = useSelector((state: any) => state.about);
    const dispatch = useDispatch();

    const [writeComment, setWriteComment] = useState(false);
    const [comment, setComment] = useState("");
    const [secret, setSecret] = useState(false);

    const [editName, setEditName] = useState(false);
    const [editBirth, setEditBirth] = useState(false);
    const [editInfo, setEditInfo] = useState(false);

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

    return (
        <section className="about admin">
            <div className="content">
                <div>
                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    <td colSpan={2} className="font-smoothing">
                                        {editName ? <input type="text" defaultValue={aboutState.name} /> : aboutState.name}
                                    </td>
                                    {editName ?
                                        <td>
                                            <input type="button" value="등록" />
                                            <input type="button" value="취소" onClick={() => setEditName(false)} />
                                        </td> :
                                        <td>
                                            <input type="button" value="편집" onClick={() => setEditName(true)} />
                                        </td>}
                                </tr>
                                <tr>
                                    <td className="font-smoothing">BIRTH.</td>
                                    <td className="font-smoothing">
                                        {aboutState.birth === "" ? null :
                                            (editBirth ?
                                                <DatePicker
                                                    selected={dayjs(aboutState.birth, "YYYY.MM.DD").toDate()}
                                                    onChange={(datetime: Date) => dispatch({ type: "SET_ABOUT_DATA", payload: { birth: dayjs(datetime).format("YYYY.MM.DD") } })} /> :
                                                aboutState.birth)}
                                        {editBirth ?
                                            <div>
                                                <input type="button" value="등록" />
                                                <input type="button" value="취소" onClick={() => setEditBirth(false)} />
                                            </div> :
                                            <div>
                                                <input type="button" value="편집" onClick={() => setEditBirth(true)} />
                                            </div>}
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2} className="font-smoothing">
                                        <h4>소개글.</h4>
                                        <p>
                                            {editInfo ? <textarea defaultValue={aboutState.info} /> : aboutState.info}
                                        </p>
                                        {editInfo ?
                                            <div>
                                                <input type="button" value="등록" />
                                                <input type="button" value="취소" onClick={() => setEditInfo(false)} />
                                            </div> :
                                            <div>
                                                <input type="button" value="편집" onClick={() => setEditInfo(true)} />
                                            </div>}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    {/*<Image src={"/api/img/" + aboutState.img.filename} width={aboutState.img.width} height={aboutState.img.height} draggable={false} />*/}
                    <img src={"/api/img/" + aboutState.img.filename} width={aboutState.img.width} height={aboutState.img.height} draggable={false} alt="" />
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
