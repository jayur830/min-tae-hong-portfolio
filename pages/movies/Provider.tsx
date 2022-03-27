// Package
import { useEffect, useMemo, useState } from "react";
import constate from "constate";

// Global
import { MediaMetadata, Movies } from "@root/types";

// Local

type MoviesScene = {
	year: string;
	moviesIndex: number;
	sceneIndex: number;
	max: number;
};

const useMovies = () => {
	const [data, setData] = useState<Movies>({});

	const [moviesScene, setMoviesScene] = useState<MoviesScene>({
		year: "",
		moviesIndex: -1,
		sceneIndex: -1,
		max: -1,
	});

	const [moviesVideo, setMoviesVideo] = useState<MediaMetadata | null>(null);

	const years = useMemo(() => {
		const years = Object.keys(data);
		years.sort((a, b) => (a < b ? 1 : -1));
		return years;
	}, [data]);

	useEffect(() => {
		fetch("/api/movies/data")
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
						awards: Object.freeze(obj.awards),
						img: obj.img == null ? null : { ...obj.img },
						video: obj.video == null ? null : { ...obj.video },
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
		moviesScene,
		setMoviesScene,
		moviesVideo,
		setMoviesVideo,
		years,
	};
};

const [Provider, useData, useMoviesScene, useSetMoviesScene, useMoviesVideo, useSetMoviesVideo, useYears] = constate(
	useMovies,
	(value) => value.data,
	(value) => value.moviesScene,
	(value) => value.setMoviesScene,
	(value) => value.moviesVideo,
	(value) => value.setMoviesVideo,
	(value) => value.years
);

export { Provider, useData, useMoviesScene, useSetMoviesScene, useMoviesVideo, useSetMoviesVideo, useYears };
