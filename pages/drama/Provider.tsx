// Package
import { useEffect, useMemo, useState } from "react";
import constate from "constate";

// Global
import { Theaters } from "@root/types";

// Local

const useDrama = () => {
	const [data, setData] = useState<Theaters>({});

	const [dramaScene, setDramaScene] = useState({
		year: "",
		dramaIndex: -1,
		sceneIndex: -1,
		max: -1,
	});

	const years = useMemo(() => {
		const years = Object.keys(data);
		years.sort((a, b) => (a < b ? 1 : -1));
		return years;
	}, [data]);

	useEffect(() => {
		fetch("/api/drama/data")
			.then((response) => response.json())
			.then((data) => {
				let _data: { [year: string]: any[] } = {};
				data.forEach((obj: any) => {
					const year = obj.year.toString();
					if (!(year in _data)) _data[year] = [];
					_data[year].push({
						_id: obj._id,
						title: obj.title,
						director: obj.director,
						actors: Object.freeze(obj.actors),
						schedule: obj.schedule,
						img: obj.img == null ? null : { ...obj.img },
						scenes: Object.freeze(obj.scenes),
						scenePage: 0,
						scenePages: Math.ceil(obj.scenes.length / 5),
						sceneIndex: -1,
					});
				});
				setData(_data);
			});
	}, [setData]);

	return {
		data,
		dramaScene,
		setDramaScene,
		years,
	};
};

const [Provider, useData, useDramaScene, useSetDramaScene, useYears] = constate(
	useDrama,
	(value) => value.data,
	(value) => value.dramaScene,
	(value) => value.setDramaScene,
	(value) => value.years
);

export { Provider, useData, useDramaScene, useSetDramaScene, useYears };
