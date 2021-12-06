export type CommonState = {
    title: string
};

const initialState: CommonState = {
    title: ""
};

export default (state: CommonState = initialState, action: any) => {
    switch (action.type) {
    case "SET_COMMON_TITLE":
        return {
            ...state,
            ...action.payload
        };
    default:
        return state;
    }
};
