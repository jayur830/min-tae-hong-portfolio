import React from "react";
import { NextPage } from "next";
import Link from "next/link";

import DarkModeButton from "../DarkModeButton";
import AppTemplate from "../AppTemplate";

import { useInitApi } from "../../hooks/useInitApi";
import { useCommon } from "../../pages/Provider";
import {
    Provider,
    useIconsHtml,
    useLinkList,
    useOpenSideMenu,
    useSetIconsHtml,
    useSetOpenSideMenu,
} from "./Provider";

const AppLayout: NextPage = ({ children }) => {
    const common = useCommon();
    const iconsHtml = useIconsHtml();
    const setIconsHtml = useSetIconsHtml();
    const openSideMenu = useOpenSideMenu();
    const setOpenSideMenu = useSetOpenSideMenu();
    const linkList = useLinkList();

    // useInitApi(setIconsHtml);

    return (
        <AppTemplate>
            <header className="app-header">
                <DarkModeButton />
                <div>
                    <Link href="/" passHref>
                        <h1>{common.headerTitle}</h1>
                    </Link>
                </div>
                {common.windowWidth > 1120 ? (
                    <nav>
                        <ul>{linkList}</ul>
                    </nav>
                    ) : (
                    <div className="mobile-nav">
                        <div className={"menu-btn " + (openSideMenu ? "on" : "")} onClick={() => setOpenSideMenu(!openSideMenu)}>
                            <span />
                            <span />
                            <span />
                        </div>
                        <div className={"side-menu animate__animated animate__slide" + (openSideMenu ? "InLeft" : "OutLeft")}>
                            <nav>
                                <ul>{linkList}</ul>
                            </nav>
                        </div>
                    </div>
                    )}
            </header>
            {children}
            <footer className="app-footer">
                <div className="font-smoothing">©Copyright 2021. All Rights Reserved.</div>
                {common.windowWidth > 1120 ? null : <br />}
                {iconsHtml}
            </footer>
        </AppTemplate>
    );
};

export default (props: any) => (
    <Provider>
        <AppLayout {...props} />
    </Provider>
);
