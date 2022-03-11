export type ContactState = {
    email: string,
    img: {
        filename: string,
        width: number,
        height: number
    }
};

const initialState: ContactState = {
    email: "",
    img: {
        filename: "",
        width: 0,
        height: 0
    }
};

const contactReducer = (state: ContactState = initialState, action: any) => {
    switch (action.type) {
    case "SET_CONTACT_DATA":
        return {
            ...state,
            ...action.payload
        };
    default:
        return state;
    }
};

export default contactReducer;
