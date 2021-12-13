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
    case "SET_DRAMA_DATA":
        return {
            ...state,
            ...action.payload
        };
    case "INCREASE_DRAMA_SCENE_PAGE": {
        const _state = { ...state };
        const { year, i } = action.payload;
        ++_state[year][i].scenePage;
        return _state;
    }
    case "DECREASE_DRAMA_SCENE_PAGE": {
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
