import React, { useCallback, useEffect, useMemo, useState } from "react";
import { NextPage } from "next";
import Image from "next/image";

import { useDispatch, useSelector } from "react-redux";

import dayjs from "dayjs";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faPen, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Line from "../../components/Line";
import about from "../../models/about";
import { uploadImage } from "../../hooks/uploadImage";
import BlackButton from "../../components/BlackButton";

const About: NextPage = () => {
    const commonState = useSelector((state: any) => state.common);
    const aboutState = useSelector((state: any) => state.about);
    const dispatch = useDispatch();

    const [writeComment, setWriteComment] = useState(false);
    const [comment, setComment] = useState("");
    const [secret, setSecret] = useState(false);

    const [editName, setEditName] = useState(false);
    const [editBirth, setEditBirth] = useState(false);
    const [editInfo, setEditInfo] = useState(false);

    const [metadata, setMetadata] = useState(aboutState.metadata.concat());
    const [editMetadata, setEditMetadata] = useState(aboutState.metadata.map(() => false));
    const [newMetadataItem, setNewMetadataItem] = useState<{ label: string, value: string } | null>(null);

    const [imgFile, setImgFile] = useState(null);
    const [editImg, setEditImg] = useState(false);

    useEffect(() => setMetadata(aboutState.metadata.concat()), [aboutState]);

    const commitMetadata = useCallback((_id: string, metadata: { label: string, value: string }[]) => {
        fetch("/api/admin/about/setMetadata", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                _id,
                metadata
            })
        });
        dispatch({ type: "SET_ABOUT_METADATA", payload: { metadata } });
    }, [dispatch]);

    const removeMetadata = useCallback(removeIndex => {
        if (confirm("삭제하시겠습니까?")) {
            const _metadata = metadata.concat();
            _metadata.splice(removeIndex, 1);
            commitMetadata(aboutState._id, _metadata);
        }
    }, [aboutState, metadata, commitMetadata]);

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
        uploadImage(file);
        dispatch({ type: "SET_ABOUT_DATA", payload: { img } });
    }, [dispatch]);

    const postComment = useCallback(() => {
        const payload = {
            comment,
            date: dayjs().format("YYYY.MM.DD HH:mm"),
            secret
        };
        fetch("/api/writeComment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        dispatch({
            type: "ADD_ABOUT_COMMENT",
            payload
        });
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
                    <BlackButton onClick={() => {
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
                    }}>등록</BlackButton>
                    <BlackButton onClick={() => {
                        setImgFile(null);
                        setEditImg(false);
                    }}>취소</BlackButton>
                </> :
                <BlackButton onClick={() => setEditImg(true)}>편집</BlackButton>}
        </div>, [aboutState, editImg, setEditImg, imgFile, setImgFile, commitImgFile]);

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
                                        <td className="font-smoothing">
                                            {editMetadata[i] ?
                                                <input type="text" defaultValue={obj.label} onKeyUp={(e: any) => {
                                                    if (e.key === "Enter") {
                                                        commitMetadata(aboutState._id, metadata);
                                                        const _editMetadata = editMetadata.concat();
                                                        _editMetadata[i] = false;
                                                        setEditMetadata(_editMetadata);
                                                    } else {
                                                        const _metadata = metadata.concat();
                                                        _metadata[i].label = e.target.value;
                                                        setMetadata(_metadata);
                                                    }
                                                }} /> :
                                                `${obj.label}.`}
                                        </td>
                                        <td className="font-smoothing">
                                            {editMetadata[i] ?
                                                <input type="text" defaultValue={obj.value} onKeyUp={(e: any) => {
                                                    if (e.key === "Enter") {
                                                        commitMetadata(aboutState._id, metadata);
                                                        const _editMetadata = editMetadata.concat();
                                                        _editMetadata[i] = false;
                                                        setEditMetadata(_editMetadata);
                                                    } else {
                                                        const _metadata = metadata.concat();
                                                        _metadata[i].value = e.target.value;
                                                        setMetadata(_metadata);
                                                    }
                                                }} /> :
                                                obj.value}
                                        </td>
                                        <td>
                                            {editMetadata[i] ?
                                                <>
                                                    <BlackButton onClick={() => {
                                                        commitMetadata(aboutState._id, metadata);
                                                        const _editMetadata = editMetadata.concat();
                                                        _editMetadata[i] = false;
                                                        setEditMetadata(_editMetadata);
                                                    }}>등록</BlackButton>
                                                    <BlackButton onClick={() => {
                                                        const _editMetadata = editMetadata.concat();
                                                        _editMetadata[i] = false;
                                                        setEditMetadata(_editMetadata);
                                                    }}>취소</BlackButton>
                                                </> :
                                                <>
                                                    <FontAwesomeIcon size="1x" icon={faPen} onClick={() => {
                                                        const _editMetadata = editMetadata.concat();
                                                        _editMetadata[i] = true;
                                                        setEditMetadata(_editMetadata);
                                                    }} />
                                                    <FontAwesomeIcon size="1x" icon={faMinus} onClick={() => removeMetadata(i)} />
                                                </>}
                                        </td>
                                    </tr>
                                ))}
                                {newMetadataItem ?
                                    <tr>
                                        <td className="font-smoothing">
                                            <input type="text" onKeyUp={(e: any) => {
                                                if (e.key === "Enter" && confirm("작성한 내용으로 등록하시겠습니까?")) {
                                                    commitMetadata(aboutState._id, metadata.concat(newMetadataItem));
                                                    setNewMetadataItem(null);
                                                } else {
                                                    const item = { ...newMetadataItem };
                                                    item.label = e.target.value;
                                                    setNewMetadataItem(item);
                                                }
                                            }} />
                                        </td>
                                        <td className="font-smoothing">
                                            <input type="text" onKeyUp={(e: any) => {
                                                if (e.key === "Enter" && confirm("작성한 내용으로 등록하시겠습니까?")) {
                                                    commitMetadata(aboutState._id, metadata.concat(newMetadataItem));
                                                    setNewMetadataItem(null);
                                                } else {
                                                    const item = { ...newMetadataItem };
                                                    item.value = e.target.value;
                                                    setNewMetadataItem(item);
                                                }
                                            }} />
                                        </td>
                                        <td>
                                            <BlackButton onClick={() => {
                                                if (confirm("작성한 내용으로 등록하시겠습니까?")) {
                                                    commitMetadata(aboutState._id, metadata.concat(newMetadataItem));
                                                    setNewMetadataItem(null);
                                                }
                                            }}>등록</BlackButton>
                                            <BlackButton onClick={() => setNewMetadataItem(null)}>취소</BlackButton>
                                        </td>
                                    </tr> : null}
                                {newMetadataItem ? null :
                                    <tr>
                                        <td colSpan={3}>
                                            <FontAwesomeIcon size="1x" icon={faPlus} onClick={() => {
                                                setNewMetadataItem({
                                                    label: "",
                                                    value: ""
                                                });
                                            }} />
                                        </td>
                                    </tr>}
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
                                if (e.key === "Enter") {
                                    postComment();
                                    setComment("");
                                    setWriteComment(false);
                                } else setComment(e.target.value);
                            }} autoFocus={true} />
                        </div>
                        <div>
                            <BlackButton onClick={() => setWriteComment(false)}>취소</BlackButton>
                            <BlackButton onClick={() => {
                                postComment();
                                setComment("");
                                setWriteComment(false);
                            }}>등록</BlackButton>
                        </div>
                    </div>
                ) : null}
                <input type="button" value="댓글 쓰기" onClick={() => setWriteComment(true)} />
            </div>
        </section>
    );
};

export default About;
