import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, compose, createStore, Middleware } from "redux";

import reducer from "./reducer";

const wrapper = createWrapper(() => {
    const middlewares: Middleware[] = [];
    const enhancer = compose(applyMiddleware(...middlewares));
    // @ts-ignore
    return createStore(reducer, enhancer);
}, { debug: process.env.NODE_ENV === "production" });

export default wrapper;
