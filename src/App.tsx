import React from "react";
import { BrowserRouter } from "react-router-dom";

import "./App.scss";

import { AppHeader } from "./components/header/AppHeader";
import { ContentWrap } from "./components/content_wrap/ContentWrap";
import { AppFooter } from "./components/footer/AppFooter";

export const App: () => JSX.Element = () => {
    return (
        <div className="app">
            <BrowserRouter>
                <AppHeader />
                <ContentWrap />
            </BrowserRouter>
            <AppFooter />
        </div>
    );
};
