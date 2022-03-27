// Package
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import constate from "constate";
import dayjs from "dayjs";

// Global
import { About } from "@root/types";

// Local

const useAbout = () => {
	const [data, setData] = useState<About>({
		name: "",
		birth: "",
		info: "",
		metadata: [
			{
				label: "",
				value: "",
			},
		],
		img: {
			filename: "",
			width: 0,
			height: 0,
		},
		comments: [
			{
				comment: "",
				date: "",
				secret: false,
			},
		],
	});
	useEffect(() => {
		fetch("/api/about/data")
			.then(response => response.json())
			.then(setData);
	}, [setData]);

	const [writeComment, setWriteComment] = useState(false);
	const [comment, setComment] = useState("");
	const [secret, setSecret] = useState(false);

	const postComment = useCallback(() => {
		const payload = {
			comment,
			date: dayjs().format("YYYY.MM.DD HH:mm"),
			secret,
		};
		fetch("/api/writeComment", {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		});
		setData((state: About) => {
			if (state != null) {
				state.comments.push(payload);
			}
			return state;
		});
		setComment("");
		setWriteComment(false);
	}, [comment, secret]);

	const aboutImg = useMemo(
		() =>
			data ? (
				<div>
					<Image src={"/api/img/" + data.img.filename} width={data.img.width} height={data.img.height} draggable={false} alt="Index" />
				</div>
			) : null,
		[data]
	);

	return {
		data,
		setData,
		writeComment,
		setWriteComment,
		comment,
		setComment,
		secret,
		setSecret,
		postComment,
		aboutImg,
	};
};

const [Provider, useData, useSetData, useWriteComment, useSetWriteComment, useComment, useSetComment, useSecret, useSetSecret, usePostComment, useAboutImg] = constate(
	useAbout,
	value => value.data,
	value => value.setData,
	value => value.writeComment,
	value => value.setWriteComment,
	value => value.comment,
	value => value.setComment,
	value => value.secret,
	value => value.setSecret,
	value => value.postComment,
	value => value.aboutImg
);

export { Provider, useData, useSetData, useWriteComment, useSetWriteComment, useComment, useSetComment, useSecret, useSetSecret, usePostComment, useAboutImg };
