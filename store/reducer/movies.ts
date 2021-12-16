export type MoviesState = {
    [year: string]: {
        title: string,
        director: string,
        actors: string[],
        awards: string[],
        img: {
            filename: string,
            width: number,
            height: number
        },
        video: {
            filename: string,
            width: number,
            height: number
        } | {
            url: string,
            width: number,
            height: number
        } | null,
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

const initialState: MoviesState = {};

const moviesReducer = (state: MoviesState = initialState, action: any) => {
    switch (action.type) {
    case "SET_MOVIES_DATA":
        return {
            ...state,
            ...action.payload
        };
    case "INCREASE_MOVIES_SCENE_PAGE": {
        const _state = { ...state };
        const { year, i } = action.payload;
        ++_state[year][i].scenePage;
        return _state;
    }
    case "DECREASE_MOVIES_SCENE_PAGE": {
        const _state = { ...state };
        const { year, i } = action.payload;
        --_state[year][i].scenePage;
        return _state;
    }
    default:
        return state;
    }
};

export default moviesReducer;
