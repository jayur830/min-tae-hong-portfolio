import React, { useCallback, useState } from "react";
import { NextPage } from "next";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import Scene from "../../components/Scene";
import YearBlock from "../../components/YearBlock";
import SceneSlide from "../../components/SceneSlide";
import ContentEdit from "../../components/ContentEdit";
import SceneTodoList from "../../components/SceneTodoList";
import { useImgUpload } from "../../hooks/useImgUpload";
import TextTodoList from "../../components/TextTodoList";
import BlackButton from "../../components/BlackButton";

type DramasData = {
    _id: string,
    title: string,
    year: number,
    director: string,
    actors: string[],
    schedule: string,
    img: {
        filename: string,
        width: number,
        height: number,
        file: File | null
    } | null,
    scenes: ({
        filename: string,
        width: number,
        height: number,
        file: File | null
    } | null)[]
}

const Drama: NextPage = () => {
    const dispatch = useDispatch();
    const dramaState = useSelector((state: any) => state.drama);

    const [dramaScene, setDramaScene] = useState({
        year: "",
        dramaIndex: -1,
        sceneIndex: -1,
        max: -1
    });
    const [contentData, setContentData] = useState<DramasData | null>(null);

    const years = Object.keys(dramaState);
    years.sort((a, b) => a < b ? 1 : -1);

    const commitDramasData = useCallback(() => {
        if (contentData) {
            if (contentData.title === "") {
                alert("제목을 입력해주세요.");
                return false;
            } else if (contentData.director === "") {
                alert("감독 이름을 입력해주세요.");
                return false;
            } else if (contentData.schedule === "") {
                alert("일정을 입력해주세요.");
                return false;
            } else if (contentData.img == null || contentData.img.filename === "") {
                alert("작품의 대표 이미지를 선택해주세요.");
                return false;
            } else {
                const payload = {
                    _id: contentData._id,
                    title: contentData.title,
                    director: contentData.director,
                    actors: contentData.actors.concat(),
                    schedule: contentData.schedule,
                    img: contentData.img ? {
                        filename: contentData.img.filename,
                        width: contentData.img.width,
                        height: contentData.img.height
                    } : null,
                    scenes: contentData.scenes == null || contentData.scenes.length === 0 ? [] : contentData.scenes.map((obj: any) => ({
                        filename: obj.filename,
                        width: obj.width,
                        height: obj.height
                    }))
                };

                if (contentData.img) useImgUpload(contentData.img.file as File);
                if (contentData.scenes && contentData.scenes.length > 0)
                    contentData?.scenes.forEach((scene: any) => useImgUpload(scene.file));

                if (contentData._id !== "") {
                    fetch("/api/admin/dramas/edit", {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            ...payload,
                            year: contentData.year
                        })
                    });

                    const dispatchData = dramaState[contentData.year].map((obj: any) => ({ ...obj }));
                    const index = dispatchData.findIndex((obj: any) => obj._id === contentData._id);
                    if (index !== -1)
                        dispatchData[index] = {
                            ...payload,
                            scenePage: dispatchData[index].scenePage,
                            scenePages: dispatchData[index].scenePages,
                            sceneIndex: dispatchData[index].sceneIndex
                        };
                    dispatch({ type: "SET_DRAMAS_DATA", payload: { [contentData.year]: dispatchData } });
                    alert("수정되었습니다.");
                } else {
                    fetch("/api/admin/dramas/create", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            ...payload,
                            year: contentData.year
                        })
                    }).then(response => response.text()).then(_id => {
                        const dispatchData = contentData.year in dramaState ? dramaState[contentData.year].map((obj: any) => ({ ...obj })) : [];
                        dispatchData.push({
                            ...payload,
                            _id,
                            scenePage: 0,
                            scenePages: contentData.scenes.length,
                            sceneIndex: -1
                        });
                        dispatch({ type: "SET_DRAMAS_DATA", payload: { [contentData.year]: dispatchData } });
                        alert("데이터가 추가되었습니다.");
                    });
                }

                return true;
            }
        } else return false;
    }, [contentData, dispatch, dramaState]);

    return (
        <section className="drama">
            {years.map((year, i) => (
                <YearBlock key={i} year={year}>
                    {(dramaState[year] as any[]).map((obj: any, j: number) => (
                        <React.Fragment key={j}>
                            <div key={j} className="drama-block">
                                {obj.img && obj.img.filename !== "" ? <Image src={"/" + obj.img.filename} width={obj.img.width} height={obj.img.height} draggable={false} alt="Drama Content Image" /> : null}
                                <div>
                                    <h3 className="font-smoothing">{obj.title}</h3>
                                    <div className="font-smoothing">연출: {obj.director}</div>
                                    <div className="font-smoothing">출연: {obj.actors.join(", ")}</div>
                                    {obj.schedule ? <div className="font-smoothing">방송: {obj.schedule}</div> : null}
                                </div>
                                {obj.scenes.length === 0 ? null :
                                    <SceneSlide
                                        type="drama"
                                        year={year}
                                        i={j}
                                        scenePage={obj.scenePage}
                                        scenes={obj.scenes}
                                        setScene={setDramaScene} />}
                            </div>
                            <div>
                                <BlackButton onClick={() => {
                                    setContentData({
                                        _id: obj._id,
                                        title: obj.title,
                                        year: +year,
                                        director: obj.director,
                                        actors: obj.actors.concat(),
                                        schedule: obj.schedule,
                                        img: null,
                                        scenes: []
                                    });
                                }}>편집</BlackButton>
                                <BlackButton onClick={() => {
                                    if (confirm("정말로 삭제하시겠습니까?")) {
                                        const data = dramaState[year].map((_obj: any) => ({ ..._obj }));
                                        data.splice(j, 1);
                                        fetch("/api/admin/dramas/remove?_id=" + obj._id);
                                        if (data.length > 0) dispatch({ type: "SET_DRAMAS_DATA", payload: { [year]: data } });
                                        else dispatch({ type: "REMOVE_DRAMAS_YEAR", payload: { year } });
                                        alert("삭제되었습니다.");
                                    }
                                }}>삭제</BlackButton>
                            </div>
                        </React.Fragment>
                    ))}
                </YearBlock>
            ))}
            <div className="content-add-btn">
                <FontAwesomeIcon size="2x" icon={faPlus} onClick={() => {
                    setContentData({
                        _id: "",
                        title: "",
                        year: new Date().getFullYear(),
                        director: "",
                        actors: [],
                        schedule: "",
                        img: null,
                        scenes: []
                    });
                }} />
            </div>
            {dramaScene.year !== ""
                && dramaScene.dramaIndex !== -1
                && dramaScene.sceneIndex !== -1
                && dramaScene.max !== -1 ?
                <Scene
                    scenes={dramaState[dramaScene.year][dramaScene.dramaIndex].scenes}
                    sceneIndex={dramaScene.sceneIndex}
                    max={dramaScene.max}
                    onClose={() => setDramaScene({
                        year: "",
                        dramaIndex: -1,
                        sceneIndex: -1,
                        max: -1
                    })} /> :
                null}
            {contentData != null ?
                <ContentEdit
                    contents={[
                        {
                            label: "연도",
                            component: <input
                                type="number"
                                defaultValue={contentData.year}
                                onKeyUp={(e: any) => {
                                    if (e.key === "Enter") commitDramasData();
                                    else {
                                        const _contentData = { ...contentData };
                                        _contentData.year = +e.target.value;
                                        setContentData(_contentData);
                                    }
                                }}
                                onChange={(e: any) => {
                                    if (e.key === "Enter") commitDramasData();
                                    else {
                                        const _contentData = { ...contentData };
                                        _contentData.year = +e.target.value;
                                        setContentData(_contentData);
                                    }
                                }} />
                        },
                        {
                            label: "이미지",
                            component: <input type="file" onChange={(e: any) => {
                                const fileReader = new FileReader();
                                fileReader.onload = function (_e: any) {
                                    const img = new window.Image();
                                    img.src = _e.target.result;
                                    img.onload = function () {
                                        const _contentData = { ...contentData };
                                        let [width, height] = [img.width, img.height];
                                        if (width > 650 && height > 860) {
                                            if (width > height) {
                                                height = Math.round(height * 650 / width);
                                                width = 650;
                                            } else {
                                                width = Math.round(width * 860 / height);
                                                height = 860;
                                            }
                                        } else if (width > 650) {
                                            height = Math.round(height * 650 / width);
                                            width = 650;
                                        } else if (height > 860) {
                                            width = Math.round(width * 860 / height);
                                            height = 860;
                                        }
                                        _contentData["img"] = {
                                            filename: e.target.files[0].name,
                                            width,
                                            height,
                                            file: e.target.files[0]
                                        };
                                        setContentData(_contentData);
                                    };
                                };
                                fileReader.readAsDataURL(e.target.files[0]);
                            }} />
                        },
                        {
                            label: "제목",
                            component: <input type="text" defaultValue={contentData.title} onKeyUp={(e: any) => {
                                if (e.key === "Enter") commitDramasData();
                                else {
                                    const _contentData = { ...contentData };
                                    _contentData.title = e.target.value;
                                    setContentData(_contentData);
                                }
                            }} />
                        },
                        {
                            label: "감독",
                            component: <input type="text" defaultValue={contentData.director} onKeyUp={(e: any) => {
                                if (e.key === "Enter") commitDramasData();
                                else {
                                    const _contentData = { ...contentData };
                                    _contentData.director = e.target.value;
                                    setContentData(_contentData);
                                }
                            }} />
                        },
                        {
                            label: "출연진",
                            component: <TextTodoList _texts={contentData.actors} onSetText={actorList => {
                                const _contentData = { ...contentData };
                                _contentData.actors = actorList.filter(actor => actor != null && actor !== "") as string[];
                                setContentData(_contentData);
                            }} />
                        },
                        {
                            label: "일정",
                            component: <input type="text" defaultValue={contentData.schedule} onKeyUp={(e: any) => {
                                if (e.key === "Enter") commitDramasData();
                                else {
                                    const _contentData = { ...contentData };
                                    _contentData.schedule = e.target.value;
                                    setContentData(_contentData);
                                }
                            }} />
                        },
                        {
                            label: "씬",
                            component: <SceneTodoList scenes={contentData.scenes} onSetScene={async sceneImgFiles => {
                                const _contentData = { ...contentData };
                                const files = sceneImgFiles.filter(file => file != null);
                                _contentData.scenes = files.map(() => null);

                                let readCount = 0;

                                sceneImgFiles.filter(file => file != null).forEach((file: any, i) => {
                                    const fileReader = new FileReader();
                                    fileReader.onload = function (e: any) {
                                        const img = new window.Image();
                                        img.src = e.target.result;
                                        img.onload = () => {
                                            _contentData.scenes[i] = {
                                                filename: file.name,
                                                width: img.width,
                                                height: img.height,
                                                file
                                            };
                                            ++readCount;
                                        };
                                    };
                                    fileReader.readAsDataURL(file);
                                });
                                while (readCount < files.length)
                                    await new Promise(resolve => setTimeout(resolve, 0));

                                setContentData(_contentData);
                            }} />
                        }
                    ]}
                    onSubmit={commitDramasData}
                    onClose={() => setContentData(null)} /> :
                null}
        </section>
    );
};

export default Drama;
