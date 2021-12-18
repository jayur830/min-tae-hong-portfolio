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
    case "SET_THEATER_DATA":
        return {
            ...state,
            ...action.payload
        };
    case "INCREASE_THEATER_SCENE_PAGE": {
        const _state = { ...state };
        const { year, i } = action.payload;
        ++_state[year][i].scenePage;
        return _state;
    }
    case "DECREASE_THEATER_SCENE_PAGE": {
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