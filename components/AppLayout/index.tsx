import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import DarkModeButton from "../DarkModeButton";
import AppTemplate from "../AppTemplate";

import { useInitApi } from "../../hooks/useInitApi";

const AppLayout: NextPage = ({ children }) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const commonState = useSelector((state: any) => state.common);
    const [iconsHtml, setIconsHtml] = useState([<React.Fragment key={0} />]);
    const [openSideMenu, setOpenSideMenu] = useState(false);

    const linkList = useMemo(() => [
        "about",
        "movies",
        "drama",
        "theater",
        "contact"].map((val, i) =>
        <li key={i} className={router.pathname === "/" + val ? "on" : ""}>
            <Link scroll={false} href={"/" + val} passHref>
                <h4>{val.toUpperCase()}</h4>
            </Link>
        </li>), [router]);

    useInitApi(setIconsHtml);

    return (
        <AppTemplate>
            <header className="app-header">
                <DarkModeButton />
                <div>
                    <Link href="/" passHref>
                        <h1>{commonState.headerTitle}</h1>
                    </Link>
                </div>
                {commonState.windowWidth > 1120 ? (
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
                {commonState.windowWidth > 1120 ? null : <br />}
                {iconsHtml}
            </footer>
        </AppTemplate>
    );
};

export default AppLayout;
