import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";

import common from "./common";
import home from "./home";
import about from "./about";
import movies from "./movies";
import drama from "./drama";
import theater from "./theater";
import contact from "./contact";
import footer from "./footer";

const reducer = (state: any, action: any) => {
    switch (action.type) {
    case HYDRATE:
        return { ...action.payload };
    default:
        return combineReducers({
            common,
            home,
            about,
            movies,
            drama,
            theater,
            contact,
            footer
        })(state, action);
    }
};

export default reducer;
