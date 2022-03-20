import constate from "constate";
import { useEffect, useMemo, useState } from "react";
import { Theaters } from "../../types";

type TheaterScene = {
    year: string,
    theaterIndex: number,
    sceneIndex: number,
    max: number
}

const _useTheaters = () => {
    const [theaters, setTheaters] = useState<Theaters>({});

    const [theaterScene, setTheaterScene] = useState<TheaterScene>({
        year: "",
        theaterIndex: -1,
        sceneIndex: -1,
        max: -1
    });

    const years = useMemo(() => {
        const years = Object.keys(theaters);
        years.sort((a, b) => a < b ? 1 : -1);
        return years;
    }, [theaters]);

    useEffect(() => {
        fetch("/api/theater/data")
            .then(response => response.json())
            .then(data => {
                let _data: { [year: string]: any[] } = {};
                data.forEach((obj: any) => {
                    const year = obj.year.toString();
                    if (!(year in _data)) _data[year] = [];
                    _data[year].push({
                        _id: obj._id,
                        title: obj.title,
                        theater: obj.theater,
                        schedule: obj.schedule,
                        img: obj.img == null ? null : { ...obj.img },
                        scenes: Object.freeze(obj.scenes),
                        scenePage: 0,
                        scenePages: Math.ceil(obj.scenes.length / 5),
                        sceneIndex: -1
                    });
                });
                setTheaters(_data);
            });
    }, [setTheaters]);

    return {
        theaters,
        theaterScene,
        setTheaterScene,
        years
    };
};

const [
    Provider,
    useTheaters,
    useTheaterScene,
    useSetTheaterScene,
    useYears
] = constate(
    _useTheaters,
    value => value.theaters,
    value => value.theaterScene,
    value => value.setTheaterScene,
    value => value.years
);

export {
    Provider,
    useTheaters,
    useTheaterScene,
    useSetTheaterScene,
    useYears
};