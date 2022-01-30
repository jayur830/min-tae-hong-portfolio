import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcons from "@fortawesome/free-solid-svg-icons";

import { useInitApi } from "../hooks";

const AdminLayout: NextPage = ({ children }) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const commonState = useSelector((state: any) => state.common);
    const footerState = useSelector((state: any) => state.footer);
    const [iconsHtml, setIconsHtml] = useState([<React.Fragment key={0} />]);
    const [openSideMenu, setOpenSideMenu] = useState(false);

    const [editTitle, setEditTitle] = useState(false);
    const [editHeaderTitle, setEditHeaderTitle] = useState(false);
    const [editSnsList, setEditSnsList] = useState(false);

    const [title, setTItle] = useState(commonState.title);
    const [headerTitle, setHeaderTItle] = useState(commonState.headerTitle);
    const [snsList, setSnsList] = useState(Object.freeze(footerState.sns.concat()));
    const [newSnsList, setNewSnsList] = useState(Object.freeze([]));

    const commitTitle = (title: string) => {
        fetch("/api/admin/setTitle?title=" + title);
        dispatch({ type: "SET_COMMON_DATA", payload: { title } });
        setEditTitle(false);
    }

    const commitHeaderTitle = (headerTitle: string) => {
        fetch("/api/admin/setHeaderTitle?title=" + headerTitle);
        dispatch({ type: "SET_COMMON_DATA", payload: { headerTitle } });
        setEditHeaderTitle(false);
    }

    const linkList = useMemo(() => [
        "about",
        "movies",
        "drama",
        "theater",
        "contact"].map((val, i) =>
        <li key={i} className={router.pathname === "/admin/" + val ? "on" : ""}>
            <Link scroll={false} href={"/admin/" + val} passHref>
                <h4>{val.toUpperCase()}</h4>
            </Link>
        </li>), [router]);

    const snsOptions = useMemo(() => [
        "Instagram",
        "Facebook",
        "Twitter",
        "Line",
        "Youtube",
        "Pinterest",
        "Tiktok",
        "Snapchat"
    ].map((sns, i) => <option key={i} value={sns.toLowerCase()}>{sns}</option>), []);

    useInitApi(setIconsHtml, setSnsList);

    return (
        <div className={`text-no-drag ${commonState.darkMode ? "dark" : "light"}-mode`}>
            <Head>
                <title>{commonState.title}</title>
                <meta name="description" content="민태홍 포트폴리오" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {editTitle ? (
                <article className="title">
                    <h4>페이지 타이틀.</h4>
                    <input type="text" defaultValue={commonState.title} onKeyUp={(e: any) => {
                        if (e.key === "Enter") commitTitle(e.target.value);
                        else setTItle(e.target.value);
                    }} />
                    <input type="button" value="등록" onClick={() => commitTitle(title)} />
                    <input type="button" value="취소" onClick={() => setEditTitle(false)} />
                </article>
            ) : (
                <article className="title">
                    <h4>페이지 타이틀.</h4>
                    <span>{commonState.title}</span>
                    <input type="button" value="편집" onClick={() => setEditTitle(true)} />
                </article>
            )}
            <header className="app-header">
                <div className="dark-mode-btn">
                    <span className="font-smoothing">{commonState.darkMode ? "Dark" : "Light"}</span>
                    <div className="font-smoothing"><span style={{ transform: `translateX(${commonState.darkMode ? 11 : -12}px)` }} onClick={() => dispatch({ type: "SET_DARK_MODE" })} /></div>
                </div>
                {editHeaderTitle ?
                    <div>
                        <h1><input type="text" defaultValue={commonState.headerTitle} onKeyUp={(e: any) => {
                            if (e.key === "Enter") commitHeaderTitle(e.target.value);
                            else setHeaderTItle(e.target.value);
                        }} /></h1>
                        <input type="button" value="등록" onClick={() => commitHeaderTitle(headerTitle)} />
                        <input type="button" value="취소" onClick={() => setEditHeaderTitle(false)} />
                    </div> :
                    <div>
                        <Link href="/admin" passHref>
                            <h1>{commonState.headerTitle}</h1>
                        </Link>
                        <input type="button" value="편집" onClick={() => setEditHeaderTitle(true)} />
                    </div>}
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
                {editSnsList ? (
                    <>
                        <table>
                            <tbody>
                                {snsList.map(((sns: { name: string, url: string }, i: number) => (
                                    <tr key={i}>
                                        <td>
                                            <select value={sns.name} onChange={(e: any) => {
                                                const _snsList = snsList.concat();
                                                _snsList[i].name = e.target.value;
                                                setSnsList(_snsList);
                                            }}>{snsOptions}</select>
                                        </td>
                                        <td>
                                            <input type="text" defaultValue={sns.url} onKeyUp={(e: any) => {
                                                const _snsList = snsList.concat();
                                                _snsList[i].url = e.target.value;
                                                setSnsList(_snsList);
                                            }} />
                                        </td>
                                        <td><FontAwesomeIcon size="1x" icon={SolidIcons.faMinusCircle} /></td>
                                    </tr>
                                )))}
                                {newSnsList.map((sns: { name: string, url: string }, i: number) => (
                                    <tr key={i}>
                                        <td>
                                            <select value={sns.name}>{snsOptions}</select>
                                        </td>
                                        <td>
                                            <input type="text" onKeyUp={(e: any) => {
                                                const _newSnsList = newSnsList.concat();
                                                // _newSnsList[i].url = e.target.value;
                                                setNewSnsList(_newSnsList);
                                            }} />
                                        </td>
                                        <td><FontAwesomeIcon size="1x" icon={SolidIcons.faMinusCircle} /></td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan={3}>
                                        <FontAwesomeIcon icon={SolidIcons.faPlus} />
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                            <tr>
                                <td colSpan={3}>
                                    <input type="button" value="등록" />
                                    <input type="button" value="취소" onClick={() => setEditSnsList(false)} />
                                </td>
                            </tr>
                            </tfoot>
                        </table>
                    </>
                ) : (
                    <>
                        {iconsHtml}
                        <input type="button" value="편집" onClick={() => setEditSnsList(true)} />
                    </>
                )}
            </footer>
        </div>
    );
};

export default AdminLayout;
