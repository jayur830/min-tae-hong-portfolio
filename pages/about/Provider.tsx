import React, { useCallback, useEffect, useMemo, useState } from "react";
import { About } from "../../types";
import constate from "constate";
import dayjs from "dayjs";
import Image from "next/image";

const _useAbout = () => {
    const [about, setAbout] = useState<About>({
        name: "",
        birth: "",
        info: "",
        metadata: [
            {
                label: "",
                value: ""
            }
        ],
        img: {
            filename: "",
            width: 0,
            height: 0
        },
        comments: [
            {
                comment: "",
                date: "",
                secret: false
            }
        ]
    });
    useEffect(() => {
        fetch("/api/about/data")
            .then(response => response.json())
            .then(setAbout);
    }, [setAbout]);

    const [writeComment, setWriteComment] = useState(false);
    const [comment, setComment] = useState("");
    const [secret, setSecret] = useState(false);

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
        setAbout((state: About) => {
            if (state != null) {
                state.comments.push(payload);
            }
            return state;
        });
        setComment("");
        setWriteComment(false);
    }, [comment, secret]);

    const aboutImg = useMemo(() =>
        about ?
            <div>
                <Image
                    src={"/" + about.img.filename}
                    width={about.img.width}
                    height={about.img.height}
                    draggable={false}
                    alt="Index" />
            </div> :
            null, [about]);

    return {
        about,
        setAbout,
        writeComment,
        setWriteComment,
        comment,
        setComment,
        secret,
        setSecret,
        postComment,
        aboutImg
    };
};

const [
    Provider,
    useAbout,
    useSetAbout,
    useWriteComment,
    useSetWriteComment,
    useComment,
    useSetComment,
    useSecret,
    useSetSecret,
    usePostComment,
    useAboutImg
] = constate(
    _useAbout,
    value => value.about,
    value => value.setAbout,
    value => value.writeComment,
    value => value.setWriteComment,
    value => value.comment,
    value => value.setComment,
    value => value.secret,
    value => value.setSecret,
    value => value.postComment,
    value => value.aboutImg
);

export {
    Provider,
    useAbout,
    useSetAbout,
    useWriteComment,
    useSetWriteComment,
    useComment,
    useSetComment,
    useSecret,
    useSetSecret,
    usePostComment,
    useAboutImg
};