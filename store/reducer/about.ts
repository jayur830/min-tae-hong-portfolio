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
        comment: string
        date: string,
        secret: boolean
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
            comment: "",
            date: "",
            secret: false
        }
    ]
};

const aboutReducer = (state: AboutState = initialState, action: any) => {
    switch (action.type) {
    case "SET_ABOUT_DATA":
        return {
            ...state,
            ...action.payload
        };
    case "ADD_ABOUT_COMMENT":
        return {
            ...state,
            comments: state.comments.concat(action.payload)
        }
    default:
        return state;
    }
};

export default aboutReducer;
