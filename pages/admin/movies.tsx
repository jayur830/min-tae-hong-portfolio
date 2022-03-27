// Package
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NextPage } from "next";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// Global
import { uploadImage } from "@root/hooks/uploadImage";
import Scene from "@components/Scene";
import YearBlock from "@components/YearBlock";
import SceneSlide from "@components/SceneSlide";
import ContentEdit from "@components/ContentEdit";
import TextTodoList from "@components/TextTodoList";
import SceneTodoList from "@components/SceneTodoList";
import VideoModal from "@components/VideoModal";
import BlackButton from "@components/BlackButton";

// Local

type MoviesData = {
	_id: string;
	title: string;
	year: number;
	director: string;
	actors: string[];
	awards: string[];
	img: {
		filename: string;
		width: number;
		height: number;
		file: File | null;
	} | null;
	video: {
		filename: string;
		width: number;
		height: number;
		file: File | null;
	} | null;
	scenes: ({
		filename: string;
		width: number;
		height: number;
		file: File | null;
	} | null)[];
};

const Movies: NextPage = () => {
	const dispatch = useDispatch();
	const moviesState = useSelector((state: any) => state.movies);

	const [moviesScene, setMoviesScene] = useState({
		year: "",
		moviesIndex: -1,
		sceneIndex: -1,
		max: -1,
	});
	const [moviesVideo, setMoviesVideo] = useState<{ filename: string; width: number; height: number } | null>(null);
	const [contentData, setContentData] = useState<MoviesData | null>(null);

	const years = Object.keys(moviesState);
	years.sort((a, b) => (a < b ? 1 : -1));

	const commitMoviesData = useCallback(() => {
		if (contentData) {
			if (contentData.title === "") {
				alert("제목을 입력해주세요.");
				return false;
			} else if (contentData.director === "") {
				alert("감독 이름을 입력해주세요.");
				return false;
			} else {
				const payload = {
					_id: contentData._id,
					title: contentData.title,
					director: contentData.director,
					actors: contentData.actors.concat(),
					awards: contentData.awards.concat(),
					img: contentData.img
						? {
								filename: contentData.img.filename,
								width: contentData.img.width,
								height: contentData.img.height,
						  }
						: null,
					video: contentData.video
						? {
								filename: contentData.video.filename,
								width: contentData.video.width,
								height: contentData.video.height,
						  }
						: null,
					scenes:
						contentData.scenes == null || contentData.scenes.length === 0
							? []
							: contentData.scenes.map((obj: any) => ({
									filename: obj.filename,
									width: obj.width,
									height: obj.height,
							  })),
				};

				if (contentData.img) uploadImage(contentData.img?.file as File);
				if (contentData.video) uploadImage(contentData.video.file as File);
				if (contentData.scenes && contentData.scenes.length > 0) contentData?.scenes.forEach((scene: any) => uploadImage(scene.file));

				if (contentData._id !== "") {
					fetch("/api/admin/movies/edit", {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							...payload,
							year: contentData.year,
						}),
					});

					const dispatchData = moviesState[contentData.year].map((obj: any) => ({ ...obj }));
					const index = dispatchData.findIndex((obj: any) => obj._id === contentData._id);
					if (index !== -1)
						dispatchData[index] = {
							...payload,
							scenePage: dispatchData[index].scenePage,
							scenePages: dispatchData[index].scenePages,
							sceneIndex: dispatchData[index].sceneIndex,
						};
					dispatch({ type: "SET_MOVIES_DATA", payload: { [contentData.year]: dispatchData } });
					alert("수정되었습니다.");
				} else {
					fetch("/api/admin/movies/create", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							...payload,
							year: contentData.year,
						}),
					})
						.then(response => response.text())
						.then(_id => {
							const dispatchData = contentData.year in moviesState ? moviesState[contentData.year].map((obj: any) => ({ ...obj })) : [];
							dispatchData.push({
								...payload,
								_id,
								scenePage: 0,
								scenePages: contentData.scenes.length,
								sceneIndex: -1,
							});
							dispatch({ type: "SET_MOVIES_DATA", payload: { [contentData.year]: dispatchData } });
							alert("데이터가 추가되었습니다.");
						});
				}

				return true;
			}
		} else return false;
	}, [contentData, dispatch, moviesState]);

	return (
		<section className="movies">
			{years.map((year, i) => (
				<YearBlock key={i} year={year}>
					{(moviesState[year] as any[]).map((obj: any, j: number) => (
						<React.Fragment key={j}>
							<div key={j} className="movies-block">
								{obj.img && obj.img.filename !== "" ? <Image src={"/api/file/" + obj.img.filename} width={obj.img.width} height={obj.img.height} draggable={false} alt="Movies Content Image" /> : null}
								<div>
									{obj.video ? <BlackButton onClick={() => setMoviesVideo({ ...obj.video })}>VIDEO</BlackButton> : null}
									<h3 className="font-smoothing">{obj.title}</h3>
									<div className="font-smoothing">감독: {obj.director}</div>
									{obj.actors.length === 0 ? null : <div className="font-smoothing">출연: {obj.actors.join(", ")}</div>}
									{obj.awards.length > 0 ? (
										<ul>
											{obj.awards.map((award: string, k: number) => (
												<li key={k} className="font-smoothing">
													{award}
												</li>
											))}
										</ul>
									) : null}
								</div>
								{obj.scenes.length === 0 ? null : <SceneSlide type="movies" year={year} i={j} scenePage={obj.scenePage} scenes={obj.scenes} setScene={setMoviesScene} />}
							</div>
							<div>
								<BlackButton
									onClick={() => {
										setContentData({
											_id: obj._id,
											title: obj.title,
											year: +year,
											director: obj.director,
											awards: obj.awards.concat(),
											actors: obj.actors.concat(),
											img: null,
											video: null,
											scenes: [],
										});
									}}>
									편집
								</BlackButton>
								<BlackButton
									onClick={() => {
										if (confirm("정말로 삭제하시겠습니까?")) {
											const data = moviesState[year].map((_obj: any) => ({ ..._obj }));
											data.splice(j, 1);
											fetch("/api/admin/movies/remove?_id=" + obj._id);
											if (data.length > 0) dispatch({ type: "SET_MOVIES_DATA", payload: { [year]: data } });
											else dispatch({ type: "REMOVE_MOVIES_YEAR", payload: { year } });
											alert("삭제되었습니다.");
										}
									}}>
									삭제
								</BlackButton>
							</div>
						</React.Fragment>
					))}
				</YearBlock>
			))}
			<div className="content-add-btn">
				<FontAwesomeIcon
					size="2x"
					icon={faPlus}
					onClick={() => {
						setContentData({
							_id: "",
							title: "",
							year: new Date().getFullYear(),
							director: "",
							awards: [],
							actors: [],
							img: null,
							video: null,
							scenes: [],
						});
					}}
				/>
			</div>
			{moviesScene.year !== "" && moviesScene.moviesIndex !== -1 && moviesScene.sceneIndex !== -1 && moviesScene.max !== -1 ? (
				<Scene
					scenes={moviesState[moviesScene.year][moviesScene.moviesIndex].scenes}
					sceneIndex={moviesScene.sceneIndex}
					max={moviesScene.max}
					onClose={() =>
						setMoviesScene({
							year: "",
							moviesIndex: -1,
							sceneIndex: -1,
							max: -1,
						})
					}
				/>
			) : null}
			{moviesVideo ? <VideoModal src={moviesVideo} onClose={() => setMoviesVideo(null)} /> : null}
			{contentData != null ? (
				<ContentEdit
					contents={[
						{
							label: "연도",
							component: (
								<input
									type="number"
									defaultValue={contentData.year}
									onKeyUp={(e: any) => {
										if (e.key === "Enter") commitMoviesData();
										else {
											const _contentData = { ...contentData };
											_contentData.year = +e.target.value;
											setContentData(_contentData);
										}
									}}
									onChange={(e: any) => {
										if (e.key === "Enter") commitMoviesData();
										else {
											const _contentData = { ...contentData };
											_contentData.year = +e.target.value;
											setContentData(_contentData);
										}
									}}
								/>
							),
						},
						{
							label: "이미지",
							component: (
								<input
									type="file"
									onChange={(e: any) => {
										const fileReader = new FileReader();
										fileReader.onload = function (_e: any) {
											const img = new window.Image();
											img.src = _e.target.result;
											img.onload = function () {
												const _contentData = { ...contentData };
												let [width, height] = [img.width, img.height];
												if (width > 650 && height > 860) {
													if (width > height) {
														height = Math.round((height * 650) / width);
														width = 650;
													} else {
														width = Math.round((width * 860) / height);
														height = 860;
													}
												} else if (width > 650) {
													height = Math.round((height * 650) / width);
													width = 650;
												} else if (height > 860) {
													width = Math.round((width * 860) / height);
													height = 860;
												}
												_contentData["img"] = {
													filename: e.target.files[0].name,
													width,
													height,
													file: e.target.files[0],
												};
												setContentData(_contentData);
											};
										};
										fileReader.readAsDataURL(e.target.files[0]);
									}}
								/>
							),
						},
						{
							label: "제목",
							component: (
								<input
									type="text"
									defaultValue={contentData.title}
									onKeyUp={(e: any) => {
										if (e.key === "Enter") commitMoviesData();
										else {
											const _contentData = { ...contentData };
											_contentData.title = e.target.value;
											setContentData(_contentData);
										}
									}}
								/>
							),
						},
						{
							label: "감독",
							component: (
								<input
									type="text"
									defaultValue={contentData.director}
									onKeyUp={(e: any) => {
										if (e.key === "Enter") commitMoviesData();
										else {
											const _contentData = { ...contentData };
											_contentData.director = e.target.value;
											setContentData(_contentData);
										}
									}}
								/>
							),
						},
						{
							label: "출연진",
							component: (
								<TextTodoList
									_texts={contentData.actors}
									onSetText={actorList => {
										const _contentData = { ...contentData };
										_contentData.actors = actorList.filter(actor => actor != null && actor !== "") as string[];
										setContentData(_contentData);
									}}
								/>
							),
						},
						{
							label: "수상이력",
							component: (
								<TextTodoList
									_texts={contentData.awards}
									onSetText={awardList => {
										const _contentData = { ...contentData };
										_contentData.awards = awardList.filter(award => award != null && award !== "") as string[];
										setContentData(_contentData);
									}}
								/>
							),
						},
						{
							label: "클립영상",
							component: (
								<input
									type="file"
									onChange={(e: any) => {
										const _contentData = { ...contentData };
										const fileReader = new FileReader();
										fileReader.onload = function (_e: any) {
											const url = URL.createObjectURL(e.target.files[0]);
											const video = document.createElement("video");
											video.src = url;
											video.addEventListener("loadedmetadata", function () {
												let [width, height] = [this.videoWidth, this.videoHeight];
												const [maxWidth, maxHeight] = [640, 480];
												if (width > maxWidth && height > maxHeight) {
													if (width > height) {
														height = Math.round((height * maxWidth) / width);
														width = maxWidth;
													} else {
														width = Math.round((width * maxHeight) / height);
														height = maxHeight;
													}
												} else if (width > maxWidth) {
													height = Math.round((height * maxWidth) / width);
													width = maxWidth;
												} else if (height > maxHeight) {
													width = Math.round((width * maxHeight) / height);
													height = maxHeight;
												}

												_contentData["video"] = {
													filename: e.target.files[0].name,
													width,
													height,
													file: e.target.files[0],
												};
												setContentData(_contentData);
											});
										};
										fileReader.readAsDataURL(e.target.files[0]);
									}}
								/>
							),
						},
						{
							label: "씬",
							component: (
								<SceneTodoList
									scenes={contentData.scenes}
									onSetScene={async sceneImgFiles => {
										const _contentData = { ...contentData };
										const files = sceneImgFiles.filter(file => file != null);
										_contentData.scenes = files.map(() => null);

										let readCount = 0;

										sceneImgFiles
											.filter(file => file != null)
											.forEach((file: any, i) => {
												const fileReader = new FileReader();
												fileReader.onload = function (e: any) {
													const img = new window.Image();
													img.src = e.target.result;
													img.onload = () => {
														_contentData.scenes[i] = {
															filename: file.name,
															width: img.width,
															height: img.height,
															file,
														};
														++readCount;
													};
												};
												fileReader.readAsDataURL(file);
											});
										while (readCount < files.length) await new Promise(resolve => setTimeout(resolve, 0));

										setContentData(_contentData);
									}}
								/>
							),
						},
					]}
					onSubmit={commitMoviesData}
					onClose={() => setContentData(null)}
				/>
			) : null}
		</section>
	);
};

export default Movies;
