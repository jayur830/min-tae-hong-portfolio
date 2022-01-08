export type FooterState = {
    sns: {
        name: string,
        url: string
    }[]
};

const initialState: FooterState = {
    sns: []
};

const footerReducer = (state: FooterState = initialState, action: any) => {
    switch (action.type) {
    case "SET_FOOTER_SNS_LIST":
        return {
            ...state,
            ...action.payload
        };
    default:
        return state;
    }
};

export default footerReducer;
