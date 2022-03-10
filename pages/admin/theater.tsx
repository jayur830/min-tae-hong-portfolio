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

type TheaterData = {
    _id: string,
    title: string,
    theater: string,
    year: number,
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

const Theater: NextPage = () => {
    const dispatch = useDispatch();
    const theaterState = useSelector((state: any) => state.theater);

    const [theaterScene, setTheaterScene] = useState({
        year: "",
        theaterIndex: -1,
        sceneIndex: -1,
        max: -1
    });
    const [contentData, setContentData] = useState<TheaterData | null>(null);

    const years = Object.keys(theaterState);
    years.sort((a, b) => a < b ? 1 : -1);

    const commitTheaterData = useCallback(() => {
        if (contentData) {
            if (contentData.title === "") {
                alert("제목을 입력해주세요.");
                return false;
            } else if (contentData.theater === "") {
                alert("극장명을 입력해주세요.");
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
                    theater: contentData.theater,
                    schedule: contentData.schedule,
                    img: {
                        filename: contentData.img?.filename,
                        width: contentData.img?.width,
                        height: contentData.img?.height
                    },
                    scenes: contentData.scenes == null || contentData.scenes.length === 0 ? [] : contentData.scenes.map((obj: any) => ({
                        filename: obj.filename,
                        width: obj.width,
                        height: obj.height
                    }))
                };

                useImgUpload(contentData.img?.file as File);
                contentData?.scenes.forEach((scene: any) => useImgUpload(scene.file));

                if (contentData._id !== "") {
                    fetch("/api/admin/theaters/edit", {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            ...payload,
                            year: contentData.year
                        })
                    });

                    const dispatchData = theaterState[contentData.year].map((obj: any) => ({ ...obj }));
                    const index = dispatchData.findIndex((obj: any) => obj._id === contentData._id);
                    if (index !== -1)
                        dispatchData[index] = {
                            ...payload,
                            scenePage: dispatchData[index].scenePage,
                            scenePages: dispatchData[index].scenePages,
                            sceneIndex: dispatchData[index].sceneIndex
                        };
                    dispatch({ type: "SET_THEATER_DATA", payload: { [contentData.year]: dispatchData } });
                } else {
                    fetch("/api/admin/theaters/create", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            ...payload,
                            year: contentData.year
                        })
                    }).then(response => response.text()).then(_id => {
                        const dispatchData = contentData.year in theaterState ? theaterState[contentData.year].map((obj: any) => ({ ...obj })) : [];
                        dispatchData.push({
                            ...payload,
                            _id,
                            scenePage: 0,
                            scenePages: 0,
                            sceneIndex: -1
                        });
                        dispatch({ type: "SET_THEATER_DATA", payload: { [contentData.year]: dispatchData } });
                    });
                }
                alert("수정되었습니다.");
                return true;
            }
        } else return false;
    }, [contentData, dispatch]);

    return (
        <section className="theater">
            {years.map((year, i) => (
                <YearBlock key={i} year={year}>
                    {(theaterState[year] as any[]).map((obj: any, j: number) => (
                        <React.Fragment key={j}>
                            <div className="theater-block">
                                {obj.img.filename ? <Image src={"/" + obj.img.filename} width={obj.img.width} height={obj.img.height} draggable={false} alt="Theater Content Image" /> : null}
                                <div>
                                    <h3 className="font-smoothing">{obj.title}</h3>
                                    <div className="font-smoothing">장소: {obj.theater}</div>
                                    <div className="font-smoothing">{obj.schedule}</div>
                                </div>
                                {obj.scenes.length === 0 ? null :
                                    <SceneSlide
                                        type="theater"
                                        year={year}
                                        i={j}
                                        scenePage={obj.scenePage}
                                        scenes={obj.scenes}
                                        setScene={setTheaterScene} />}
                            </div>
                            <div>
                                <input type="button" defaultValue="편집" onClick={() => {
                                    setContentData({
                                        _id: obj._id,
                                        title: obj.title,
                                        theater: obj.theater,
                                        year: +year,
                                        schedule: obj.schedule,
                                        img: null,
                                        scenes: []
                                    });
                                }} />
                                <input type="button" defaultValue="삭제" onClick={() => {
                                    if (confirm("정말로 삭제하시겠습니까?")) {
                                        const data = theaterState[year].map((_obj: any) => ({ ..._obj }));
                                        data.splice(j, 1);
                                        fetch("/api/admin/theaters/remove?_id=" + obj._id);
                                        if (data.length > 0) dispatch({ type: "SET_THEATER_DATA", payload: { [year]: data } });
                                        else dispatch({ type: "REMOVE_THEATER_YEAR", payload: { year } });
                                        alert("삭제되었습니다.");
                                    }
                                }} />
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
                        theater: "",
                        year: new Date().getFullYear(),
                        schedule: "",
                        img: null,
                        scenes: []
                    });
                }} />
            </div>
            {theaterScene.year !== ""
                && theaterScene.theaterIndex !== -1
                && theaterScene.sceneIndex !== -1
                && theaterScene.max !== -1 ?
                    <Scene
                        scenes={theaterState[theaterScene.year][theaterScene.theaterIndex].scenes}
                        sceneIndex={theaterScene.sceneIndex}
                        max={theaterScene.max}
                        onClose={() => setTheaterScene({
                            year: "",
                            theaterIndex: -1,
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
                                    if (e.key === "Enter") commitTheaterData();
                                    else {
                                        const _editContentData = { ...contentData };
                                        _editContentData.year = +e.target.value;
                                        setContentData(_editContentData);
                                    }
                                }}
                                onChange={(e: any) => {
                                    if (e.key === "Enter") commitTheaterData();
                                    else {
                                        const _editContentData = { ...contentData };
                                        _editContentData.year = +e.target.value;
                                        setContentData(_editContentData);
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
                                        const _editContentData = { ...contentData };
                                        let [width, height] = [img.width, img.height];
                                        if (width > 650 && height > 860) {
                                            if (width > height) {
                                                height *= Math.round(650 / width);
                                                width = 650;
                                            } else {
                                                width *= Math.round(860 / height);
                                                height = 860;
                                            }
                                        } else if (width > 650) {
                                            height *= Math.round(650 / width);
                                            width = 650;
                                        } else if (height > 860) {
                                            width *= Math.round(860 / height);
                                            height = 860;
                                        }
                                        _editContentData["img"] = {
                                            filename: e.target.files[0].name,
                                            width,
                                            height,
                                            file: e.target.files[0]
                                        };
                                        setContentData(_editContentData);
                                    };
                                };
                                fileReader.readAsDataURL(e.target.files[0]);
                            }} />
                        },
                        {
                            label: "제목",
                            component: <input type="text" defaultValue={contentData.title} onKeyUp={(e: any) => {
                                if (e.key === "Enter") commitTheaterData();
                                else {
                                    const _editContentData = { ...contentData };
                                    _editContentData.title = e.target.value;
                                    setContentData(_editContentData);
                                }
                            }} />
                        },
                        {
                            label: "장소",
                            component: <input type="text" defaultValue={contentData.theater} onKeyUp={(e: any) => {
                                if (e.key === "Enter") commitTheaterData();
                                else {
                                    const _editContentData = { ...contentData };
                                    _editContentData.theater = e.target.value;
                                    setContentData(_editContentData);
                                }
                            }} />
                        },
                        {
                            label: "일정",
                            component: <input type="text" defaultValue={contentData.schedule} onKeyUp={(e: any) => {
                                if (e.key === "Enter") commitTheaterData();
                                else {
                                    const _editContentData = { ...contentData };
                                    _editContentData.schedule = e.target.value;
                                    setContentData(_editContentData);
                                }
                            }} />
                        },
                        {
                            label: "씬",
                            component: <SceneTodoList scenes={contentData.scenes} onSetScene={async sceneImgFiles => {
                                const _editContentData = { ...contentData };
                                const files = sceneImgFiles.filter(file => file != null);
                                _editContentData.scenes = files.map(() => null);

                                let readCount = 0;

                                sceneImgFiles.filter(file => file != null).forEach((file: any, i) => {
                                    const fileReader = new FileReader();
                                    fileReader.onload = function (e: any) {
                                        const img = new window.Image();
                                        img.src = e.target.result;
                                        img.onload = () => {
                                            _editContentData.scenes[i] = {
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

                                setContentData(_editContentData);
                            }} />
                        }
                    ]}
                    onSubmit={commitTheaterData}
                    onClose={() => setContentData(null)} /> :
                null}
        </section>
    );
};

export default Theater;
