export type AboutState = {
    name: string,
    metadata: {
        label: string,
        value: string
    }[],
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
    metadata: [
        {
            label: "",
            value: ""
        }
    ],
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
        };
    case "SET_ABOUT_METADATA":
        return {
            ...state,
            metadata: action.payload.metadata
        };
    default:
        return state;
    }
};

export default aboutReducer;
