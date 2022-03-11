export type TheaterState = {
    [year: string]: {
        title: string,
        theater: string,
        schedule: string,
        img: {
            filename: string,
            width: number,
            height: number
        },
        scenes: {
            filename: string,
            width: number,
            height: number
        }[],
        scenePage: number,
        scenePages: number,
        sceneIndex: number
    }[]
};

const initialState: TheaterState = {};

const theaterReducer = (state: TheaterState = initialState, action: any) => {
    switch (action.type) {
    case "SET_THEATERS_DATA":
        return {
            ...state,
            ...action.payload
        };
    case "REMOVE_THEATERS_YEAR":
        const data = { ...state };
        delete data[action.payload.year];
        return data;
    case "INCREASE_THEATERS_SCENE_PAGE": {
        const _state = { ...state };
        const { year, i } = action.payload;
        ++_state[year][i].scenePage;
        return _state;
    }
    case "DECREASE_THEATERS_SCENE_PAGE": {
        const _state = { ...state };
        const { year, i } = action.payload;
        --_state[year][i].scenePage;
        return _state;
    }
    default:
        return state;
    }
};

export default theaterReducer;
