export type CommonState = {
    title: string,
    headerTitle: string
};

const initialState: CommonState = {
    title: "",
    headerTitle: ""
};

export default (state: CommonState = initialState, action: any) => {
    switch (action.type) {
    case "SET_COMMON_DATA":
        return {
            ...state,
            ...action.payload
        };
    default:
        return state;
    }
};
