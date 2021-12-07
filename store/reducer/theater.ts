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
        }[]
    }[]
};

const initialState: TheaterState = {};

export default (state: TheaterState = initialState, action: any) => {
    switch (action.type) {
    case "SET_THEATER_DATA":
        return {
            ...state,
            ...action.payload
        };
    default:
        return state;
    }
};
