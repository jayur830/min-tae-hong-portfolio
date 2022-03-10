import React, { useCallback, useState } from "react";
import { NextPage } from "next";
import { useSelector } from "react-redux";
import Image from "next/image";

import Scene from "../../components/Scene";
import YearBlock from "../../components/YearBlock";
import SceneSlide from "../../components/SceneSlide";
import ContentEdit from "../../components/ContentEdit";
import SceneTodoList from "../../components/SceneTodoList";

type TheaterData = {
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

    const commitContentData = useCallback(() => {
        console.log(editContentData);
        fetch("/api/admin/theaters/editData", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editContentData)
        });
        alert("수정되었습니다.");
    }, [editContentData]);

    return (
        <section className="theater">
            {years.map((year, i) => (
                <YearBlock key={i} year={year}>
                    {(theaterState[year] as any[]).map((obj: any, j: number) => (
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
                            <input type="button" defaultValue="편집" onClick={() => {
                                setEditContentData({
                                    title: obj.title,
                                    theater: obj.theater,
                                    year: +year,
                                    schedule: obj.schedule,
                                    img: { ...obj.img, file: null },
                                    scenes: obj.scenes.map((scene: { filename: string, width: number, height: number }) => ({ ...scene }))
                                });
                            }} />
                        </div>
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
                                if (e.target.value === "Enter") commitContentData();
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
                                        _editContentData.img = {
                                            filename: e.target.files[0].name,
                                            width: img.width,
                                            height: img.height,
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
                                if (e.target.value === "Enter") commitContentData();
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
                                if (e.target.value === "Enter") commitContentData();
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
                                if (e.target.value === "Enter") commitContentData();
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
                    onSubmit={commitContentData}
                    onClose={() => setEditContentData(null)} /> :
                null}
        </section>
    );
};

export default Theater;
