// Package
import React from "react";
import { NextPage } from "next";
import Image from "next/image";

// Global
import Scene from "@components/Scene";
import YearBlock from "@components/YearBlock";
import SceneSlide from "@components/SceneSlide";

// Local
import { Provider, useData, useDramaScene, useSetDramaScene, useYears } from "./Provider";

const Consumer: NextPage = () => {
	const dramas = useData();
	const dramaScene = useDramaScene();
	const setDramaScene = useSetDramaScene();
	const years = useYears();

	return (
		<section className="drama">
			{years.map((year, i) => (
				<YearBlock key={i} year={year}>
					{(dramas[year] as any[]).map((obj: any, j: number) => (
						<div key={j} className="drama-block">
							{obj.img && obj.img.filename !== "" ? <Image src={"/api/file/" + obj.img.filename} width={obj.img.width} height={obj.img.height} draggable={false} alt="Index Content Image" /> : null}
							<div>
								<h3 className="font-smoothing">{obj.title}</h3>
								<div className="font-smoothing">연출: {obj.director}</div>
								<div className="font-smoothing">출연: {obj.actors.join(", ")}</div>
								{obj.schedule ? <div className="font-smoothing">방송: {obj.schedule}</div> : null}
							</div>
							{obj.scenes.length === 0 ? null : <SceneSlide type="drama" year={year} i={j} scenePage={obj.scenePage} scenes={obj.scenes} setScene={setDramaScene} />}
						</div>
					))}
				</YearBlock>
			))}
			{dramaScene.year !== "" && dramaScene.dramaIndex !== -1 && dramaScene.sceneIndex !== -1 && dramaScene.max !== -1 ? (
				<Scene
					scenes={dramas[dramaScene.year][dramaScene.dramaIndex].scenes}
					sceneIndex={dramaScene.sceneIndex}
					max={dramaScene.max}
					onClose={() =>
						setDramaScene({
							year: "",
							dramaIndex: -1,
							sceneIndex: -1,
							max: -1,
						})
					}
				/>
			) : null}
		</section>
	);
};

const Drama = () => (
	<Provider>
		<Consumer />
	</Provider>
);

export default Drama;
