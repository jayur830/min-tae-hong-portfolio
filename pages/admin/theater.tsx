import React, { useCallback, useState } from "react";
import { NextPage } from "next";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

import Scene from "../../components/Scene";
import YearBlock from "../../components/YearBlock";
import SceneSlide from "../../components/SceneSlide";
import ContentEdit from "../../components/ContentEdit";
import SceneTodoList from "../../components/SceneTodoList";
import { useImgUpload } from "../../hooks";

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
    const [editContentData, setEditContentData] = useState<TheaterData | null>(null);

    const years = Object.keys(theaterState);
    years.sort((a, b) => a < b ? 1 : -1);

    const commitTheaterData = useCallback(() => {
        if (editContentData) {
            if (editContentData.title === "") {
                alert("제목을 입력해주세요.");
                return false;
            } else if (editContentData.theater === "") {
                alert("극장명을 입력해주세요.");
                return false;
            } else if (editContentData.schedule === "") {
                alert("일정을 입력해주세요.");
                return false;
            } else if (editContentData.img == null || editContentData.img.filename === "") {
                alert("작품의 대표 이미지를 선택해주세요.");
                return false;
            } else {
                const payload = {
                    _id: editContentData._id,
                    title: editContentData.title,
                    theater: editContentData.theater,
                    schedule: editContentData.schedule,
                    img: {
                        filename: editContentData.img?.filename,
                        width: editContentData.img?.width,
                        height: editContentData.img?.height
                    },
                    scenes: editContentData.scenes == null || editContentData.scenes.length === 0 ? [] : editContentData.scenes.map((obj: any) => ({
                        filename: obj.filename,
                        width: obj.width,
                        height: obj.height
                    }))
                };
                fetch("/api/admin/theaters/edit", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        ...payload,
                        year: editContentData.year
                    })
                });
                useImgUpload(editContentData.img?.file as File);
                editContentData?.scenes.forEach((scene: any) => useImgUpload(scene.file));

                const dispatchData = theaterState[editContentData.year].map((obj: any) => ({ ...obj }));
                const index = dispatchData.findIndex((obj: any) => obj._id === editContentData._id);
                if (index !== -1)
                    dispatchData[index] = {
                        ...payload,
                        scenePage: dispatchData[index].scenePage,
                        scenePages: dispatchData[index].scenePages,
                        sceneIndex: dispatchData[index].sceneIndex
                    };
                dispatch({ type: "SET_THEATER_DATA", payload: { [editContentData.year]: dispatchData } });
                alert("수정되었습니다.");
                return true;
            }
        } else return false;
    }, [editContentData, dispatch]);

    return (
        <section className="theater">
            {years.map((year, i) => (
                <YearBlock key={i} year={year}>
                    {(theaterState[year] as any[]).map((obj: any, j: number) => (
                        <>
                            <div key={j} className="theater-block">
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
                                    setEditContentData({
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
                                        fetch("/api/admin/theaters/remove", {
                                            method: "DELETE",
                                            headers: {
                                                "Content-Type": "application/json"
                                            },
                                            body: JSON.stringify({ _id: obj._id })
                                        });
                                        dispatch({ type: "SET_THEATER_DATA", payload: { [year]: data } });
                                        alert("삭제되었습니다.");
                                    }
                                }} />
                            </div>
                        </>
                    ))}
                </YearBlock>
            ))}
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
            {editContentData != null ?
                <ContentEdit
                    contents={[
                        {
                            label: "연도",
                            component: <input type="number" defaultValue={editContentData.year} onChange={(e: any) => {
                                if (e.target.value === "Enter") commitTheaterData();
                                else {
                                    const _editContentData = { ...editContentData };
                                    _editContentData.year = +e.target.value;
                                    setEditContentData(_editContentData);
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
                                        const _editContentData = { ...editContentData };
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
                                        setEditContentData(_editContentData);
                                    };
                                };
                                fileReader.readAsDataURL(e.target.files[0]);
                            }} />
                        },
                        {
                            label: "제목",
                            component: <input type="text" defaultValue={editContentData.title} onChange={(e: any) => {
                                if (e.target.value === "Enter") commitTheaterData();
                                else {
                                    const _editContentData = { ...editContentData };
                                    _editContentData.title = e.target.value;
                                    setEditContentData(_editContentData);
                                }
                            }} />
                        },
                        {
                            label: "장소",
                            component: <input type="text" defaultValue={editContentData.theater} onChange={(e: any) => {
                                if (e.target.value === "Enter") commitTheaterData();
                                else {
                                    const _editContentData = { ...editContentData };
                                    _editContentData.theater = e.target.value;
                                    setEditContentData(_editContentData);
                                }
                            }} />
                        },
                        {
                            label: "일정",
                            component: <input type="text" defaultValue={editContentData.schedule} onChange={(e: any) => {
                                if (e.target.value === "Enter") commitTheaterData();
                                else {
                                    const _editContentData = { ...editContentData };
                                    _editContentData.schedule = e.target.value;
                                    setEditContentData(_editContentData);
                                }
                            }} />
                        },
                        {
                            label: "씬",
                            component: <SceneTodoList scenes={editContentData.scenes} onSetScene={async sceneImgFiles => {
                                const _editContentData = { ...editContentData };
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

                                setEditContentData(_editContentData);
                            }} />
                        }
                    ]}
                    onSubmit={commitTheaterData}
                    onClose={() => setEditContentData(null)} /> :
                null}
        </section>
    );
};

export default Theater;
