import React from "react";
import { NextPage } from "next";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Line from "../../components/Line";
import {
    Provider,
    useAbout,
    useAboutImg,
    usePostComment,
    useSetComment,
    useSetWriteComment,
    useWriteComment
} from "./Provider";
import { useCommon } from "../Provider";
import { About, Common } from "../../types";

const About: NextPage = () => {
    const common = useCommon() as Common;
    const about = useAbout() as About;
    const writeComment = useWriteComment();
    const setWriteComment = useSetWriteComment();
    const setComment = useSetComment();
    const postComment = usePostComment();
    const aboutImg = useAboutImg();

    return (
        <section className="about">
            <div className="content">
                {common.windowWidth <= 1120 ? aboutImg : null}
                <div>
                    <div>
                        <table>
                            <tbody>
                                {about ? about.metadata.map((obj: any, i: number) => (
                                    <tr key={i}>
                                        <td className="font-smoothing">{obj.label}.</td>
                                        <td className="font-smoothing">{obj.value}</td>
                                    </tr>
                                )) : null}
                            </tbody>
                        </table>
                    </div>
                </div>
                {common.windowWidth > 1120 ? aboutImg : null}
            </div>
            <div className="comment">
                <h2>Comments</h2>
                {about ? about.comments.map((obj: { comment: string, date: string, secret: boolean }, i: number) => (
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
                )) : null}
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

export default () => (
    <Provider>
        <About />
    </Provider>
);
