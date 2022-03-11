export type DramaState = {
    [year: string]: {
        title: string,
        director: string,
        actors: string[],
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

const initialState: DramaState = {};

const dramaReducer = (state: DramaState = initialState, action: any) => {
    switch (action.type) {
    case "SET_DRAMAS_DATA":
        return {
            ...state,
            ...action.payload
        };
    case "REMOVE_DRAMAS_YEAR":
        const data = { ...state };
        delete data[action.payload.year];
        return data;
    case "INCREASE_DRAMAS_SCENE_PAGE": {
        const _state = { ...state };
        const { year, i } = action.payload;
        ++_state[year][i].scenePage;
        return _state;
    }
    case "DECREASE_DRAMAS_SCENE_PAGE": {
        const _state = { ...state };
        const { year, i } = action.payload;
        --_state[year][i].scenePage;
        return _state;
    }
    default:
        return state;
    }
};

export default dramaReducer;
