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
        }[]
    }[]
};

const initialState: DramaState = {
    [new Date().getFullYear().toString()]: [
        {
            title: "",
            director: "",
            actors: [""],
            schedule: "",
            img: {
                filename: "",
                width: 0,
                height: 0
            },
            scenes: [
                {
                    filename: "",
                    width: 0,
                    height: 0
                }
            ]
        }
    ]
};

const dramaReducer = (state: DramaState = initialState, action: any) => {
    switch (action.type) {
    case "SET_DRAMA_DATA":
        return {
            ...state,
            ...action.payload
        };
    default:
        return state;
    }
};

export default dramaReducer;
