export type HomeState = {
    filename: string,
    width: number,
    height: number
}[];

const initialState: HomeState = [
    {
        filename: "",
        width: 0,
        height: 0
    }
];

export default (state: HomeState = initialState, action: any) => {
    switch (action.type) {
    case "SET_HOME_DATA":
        return {
            ...state,
            ...action.payload
        };
    default:
        return state;
    }
};
