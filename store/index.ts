import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, compose, createStore, Middleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import reducer from "./reducer";

const wrapper = createWrapper(() => {
    const middlewares: Middleware[] = [];
    const enhancer = process.env.NODE_ENV === "production" ?
        compose(applyMiddleware(...middlewares)) :
        composeWithDevTools(applyMiddleware(...middlewares));
    // @ts-ignore
    return createStore(reducer, enhancer);
}, { debug: process.env.NODE_ENV === "production" });

export default wrapper;
