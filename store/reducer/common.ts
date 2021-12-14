export type CommonState = {
    title: string,
    headerTitle: string,
    darkMode: boolean,
    windowWidth: number
};

const initialState: CommonState = {
    title: "",
    headerTitle: "",
    darkMode: false,
    windowWidth: 0
};

const commonReducer = (state: CommonState = initialState, action: any) => {
    switch (action.type) {
    case "SET_COMMON_DATA":
        return {
            ...state,
            ...action.payload
        };
    case "SET_DARK_MODE":
        return {
            ...state,
            darkMode: !state.darkMode
        }
    default:
        return state;
    }
};

export default commonReducer;
