export type ContactState = {
    email: string,
    tel: string,
    img: {
        filename: string,
        width: number,
        height: number
    }
};

const initialState: ContactState = {
    email: "",
    tel: "",
    img: {
        filename: "",
        width: 0,
        height: 0
    }
};

export default (state: ContactState = initialState, action: any) => {
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
