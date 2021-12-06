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
        }
    }[]
};

const initialState: MoviesState = {
    [new Date().getFullYear().toString()]: [
        {
            title: "",
            director: "",
            actors: [""],
            awards: [""],
            img: {
                filename: "",
                width: 0,
                height: 0
            },
            video: {
                filename: "",
                width: 0,
                height: 0
            }
        }
    ]
};

export default (state: MoviesState = initialState, action: any) => {
    switch (action.type) {
    case "SET_MOVIES_DATA":
        return {
            ...state,
            ...action.payload
        };
    default:
        return state;
    }
};
