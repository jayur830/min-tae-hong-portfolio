import constate from "constate";
import { useEffect, useMemo, useState } from "react";
import { MediaMetadata, Movies } from "../../types";

type MoviesScene = {
    year: string,
    moviesIndex: number,
    sceneIndex: number,
    max: number
}

const _useMovies = () => {
    const [movies, setMovies] = useState<Movies>({});

    const [moviesScene, setMoviesScene] = useState<MoviesScene>({
        year: "",
        moviesIndex: -1,
        sceneIndex: -1,
        max: -1
    });

    const [moviesVideo, setMoviesVideo] = useState<MediaMetadata | null>(null);

    const years = useMemo(() => {
        const years = Object.keys(movies);
        years.sort((a, b) => a < b ? 1 : -1);
        return years;
    }, [movies]);

    useEffect(() => {
        fetch("/api/movies/data")
            .then(response => response.json())
            .then(data => {
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
                        sceneIndex: -1
                    });
                });
                setMovies(_data);
            });
    }, [setMovies]);

    return {
        movies,
        moviesScene,
        setMoviesScene,
        moviesVideo,
        setMoviesVideo,
        years
    };
};

const [
    Provider,
    useMovies,
    useMoviesScene,
    useSetMoviesScene,
    useMoviesVideo,
    useSetMoviesVideo,
    useYears
] = constate(
    _useMovies,
    value => value.movies,
    value => value.moviesScene,
    value => value.setMoviesScene,
    value => value.moviesVideo,
    value => value.setMoviesVideo,
    value => value.years
);

export {
    Provider,
    useMovies,
    useMoviesScene,
    useSetMoviesScene,
    useMoviesVideo,
    useSetMoviesVideo,
    useYears,
};