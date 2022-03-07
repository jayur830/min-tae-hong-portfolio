import React, { useCallback, useMemo, useState } from "react";
import { NextPage } from "next";
import Image from "next/image";

import { useDispatch, useSelector } from "react-redux";

import dayjs from "dayjs";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faPen, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Line from "../../components/Line";
import about from "../../models/about";
import { useImgUpload } from "../../hooks";

const About: NextPage = () => {
    const commonState = useSelector((state: any) => state.common);
    const aboutState = useSelector((state: any) => state.about);
    const dispatch = useDispatch();

    const removeMetadata = useCallback(removeIndex => {
        if (confirm("삭제하시겠습니까?")) {
            const metadata = aboutState.metadata.concat();
            metadata.splice(removeIndex, 1);
            dispatch({ type: "SET_ABOUT_METADATA", payload: { metadata } });
            fetch("/api/admin/about/setMetadata", {
                method: "delete",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(metadata)
            });
        }
    }, [aboutState, dispatch]);

    const [writeComment, setWriteComment] = useState(false);
    const [comment, setComment] = useState("");
    const [secret, setSecret] = useState(false);

    const [editName, setEditName] = useState(false);
    const [editBirth, setEditBirth] = useState(false);
    const [editInfo, setEditInfo] = useState(false);

    const [imgFile, setImgFile] = useState(null);
    const [editImg, setEditImg] = useState(false);

    const commitImgFile = useCallback((_id: string, img: { filename: string, width: number, height: number }, file: File) => {
        fetch("/api/admin/about/setImgFile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                _id,
                img
            })
        });
        useImgUpload(file);
        dispatch({ type: "SET_ABOUT_DATA", payload: { img } });
        setEditImg(false);
    }, [dispatch]);

    const postComment = useCallback(() => {
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
    }, [dispatch, comment, secret]);

    const aboutImg = useMemo(() =>
        <div>
            <Image
                src={"/" + aboutState.img.filename}
                width={aboutState.img.width}
                height={aboutState.img.height}
                draggable={false}
                alt="About" />
            <br />
            {editImg ?
                <>
                    <input type="file" onChange={e => {
                        if (e.target.files && e.target.files.length > 0)
                            setImgFile(e.target.files[0] as any);
                    }} /><br />
                    <input type="button" defaultValue="등록" onClick={() => {
                        const _URL = window.URL || window.webkitURL;
                        const img = new window.Image();
                        const src = _URL.createObjectURL(imgFile as any);
                        img.onload = () => {
                            _URL.revokeObjectURL(src);
                            let [width, height] = [img.width, img.height];
                            if (width > 450) {
                                height = Math.round(height * 450 / width);
                                width = 450;
                            } else if (height > 660) {
                                width = Math.round(width * 660 / height);
                                height = 660;
                            }
                            commitImgFile(aboutState._id, {
                                filename: (imgFile as any).name,
                                width,
                                height
                            }, imgFile as any);
                            setEditImg(false);
                        };
                        img.src = src;
                    }} />
                    <input type="button" defaultValue="취소" onClick={() => {
                        setImgFile(null);
                        setEditImg(false);
                    }} />
                </> :
                <input type="button" defaultValue="편집" onClick={() => setEditImg(true)} />}
        </div>, [aboutState, editImg, setEditImg, imgFile, setImgFile]);

    return (
        <section className="about admin">
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
                                        <td>
                                            <FontAwesomeIcon size="1x" icon={faPen} />
                                            <FontAwesomeIcon size="1x" icon={faMinus} onClick={() => removeMetadata(i)} />
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan={3}>
                                        <FontAwesomeIcon size="1x" icon={faPlus} />
                                    </td>
                                </tr>
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
                            <Line />
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
                            <Line />
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
