export type AboutState = {
    name: string,
    birth: string,
    info: string,
    img: {
        filename: string,
        width: number,
        height: number
    },
    comments: {
        user: string,
        comment: string
    }[]
};

const initialState: AboutState = {
    name: "",
    birth: "",
    info: "",
    img: {
        filename: "",
        width: 0,
        height: 0
    },
    comments: [
        {
            user: "",
            comment: ""
        }
    ]
};

export default (state: AboutState = initialState, action: any) => {
    switch (action.type) {
    case "SET_ABOUT_DATA":
        return {
            ...state,
            ...action.payload
        };
    default:
        return state;
    }
};
