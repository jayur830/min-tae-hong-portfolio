import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-brands-svg-icons";

const AppLayout: NextPage = ({ children }) => {
    const dispatch = useDispatch();

    const commonState = useSelector((state: any) => state.common);
    const [iconsHtml, setIconsHtml] = useState([<React.Fragment key={0} />]);
    const [openSideMenu, setOpenSideMenu] = useState(false);

    const [editTitle, setEditTitle] = useState(false);
    const [editHeaderTitle, setEditHeaderTitle] = useState(false);
    const [editSnsList, setEditSnsList] = useState(false);

    const router = useRouter();

    useEffect(() => {
        fetch("/api/data")
            .then(data => data.json())
            .then(data => {
                if ("common" in data) {
                    console.log("common:", data.common);
                    dispatch({
                        type: "SET_COMMON_DATA",
                        payload: {
                            ...data.common,
                            windowWidth: window.innerWidth
                        }
                    });
                }
                if ("home" in data)
                    dispatch({
                        type: "SET_HOME_DATA",
                        payload: data.home
                    });
                if ("about" in data)
                    dispatch({
                        type: "SET_ABOUT_DATA",
                        payload: data.about
                    })
                if ("movies" in data) {
                    let _data: { [year: string]: any[] } = {};
                    data.movies.forEach((obj: any) => {
                        const year = obj.year.toString();
                        if (!(year in _data)) _data[year] = [];
                        _data[year].push({
                            title: obj.title,
                            director: obj.director,
                            actors: Object.freeze(obj.actors),
                            awards: Object.freeze(obj.awards),
                            img: { ...obj.img },
                            video: obj.video == null ? null : { ...obj.video },
                            scenes: Object.freeze(obj.scenes)
                        });
                    });
                    dispatch({
                        type: "SET_MOVIES_DATA",
                        payload: _data
                    });
                }
                if ("drama" in data) {
                    let _data: { [year: string]: any[] } = {};
                    data.drama.forEach((obj: any) => {
                        const year = obj.year.toString();
                        if (!(year in _data)) _data[year] = [];
                        _data[year].push({
                            title: obj.title,
                            director: obj.director,
                            actors: Object.freeze(obj.actors),
                            schedule: obj.schedule,
                            img: { ...obj.img },
                            scenes: Object.freeze(obj.scenes),
                            scenePage: 0,
                            scenePages: Math.ceil(obj.scenes.length / 5),
                            sceneIndex: -1
                        });
                    });
                    dispatch({
                        type: "SET_DRAMA_DATA",
                        payload: _data
                    });
                }
                if ("theater" in data) {
                    let _data: { [year: string]: any[] } = {};
                    data.theater.forEach((obj: any) => {
                        const year = obj.year.toString();
                        if (!(year in _data)) _data[year] = [];
                        _data[year].push({
                            title: obj.title,
                            theater: obj.theater,
                            schedule: obj.schedule,
                            img: { ...obj.img },
                            scenes: Object.freeze(obj.scenes),
                            scenePage: 0,
                            scenePages: Math.ceil(obj.scenes.length / 5),
                            sceneIndex: -1
                        });
                    });
                    dispatch({
                        type: "SET_THEATER_DATA",
                        payload: _data
                    });
                }
                if ("contact" in data)
                    dispatch({
                        type: "SET_CONTACT_DATA",
                        payload: data.contact
                    });
                if ("footer" in data) {
                    dispatch({
                        type: "SET_FOOTER_SNS_LIST",
                        payload: data.footer
                    });
                    setIconsHtml(data.footer.sns.map((obj: { name: string, url: string }, i: number) => {
                        switch (obj.name) {
                        case "instagram": return <a key={i + "-" + obj.name} href={obj.url} target="_blank" rel="noreferrer"><FontAwesomeIcon size="1x" icon={Icons.faInstagram} /></a>;
                        case "facebook": return <a key={i + "-" + obj.name} href={obj.url} target="_blank" rel="noreferrer"><FontAwesomeIcon size="1x" icon={Icons.faFacebook} /></a>;
                        case "twitter": return <a key={i + "-" + obj.name} href={obj.url} target="_blank" rel="noreferrer"><FontAwesomeIcon size="1x" icon={Icons.faTwitter} /></a>;
                        case "line": return <a key={i + "-" + obj.name} href={obj.url} target="_blank" rel="noreferrer"><FontAwesomeIcon size="1x" icon={Icons.faLine} /></a>;
                        case "youtube": return <a key={i + "-" + obj.name} href={obj.url} target="_blank" rel="noreferrer"><FontAwesomeIcon size="1x" icon={Icons.faYoutube} /></a>;
                        case "pinterest": return <a key={i + "-" + obj.name} href={obj.url} target="_blank" rel="noreferrer"><FontAwesomeIcon size="1x" icon={Icons.faPinterest} /></a>;
                        case "tiktok": return <a key={i + "-" + obj.name} href={obj.url} target="_blank" rel="noreferrer"><FontAwesomeIcon size="1x" icon={Icons.faTiktok} /></a>;
                        case "snapchat": return <a key={i + "-" + obj.name} href={obj.url} target="_blank" rel="noreferrer"><FontAwesomeIcon size="1x" icon={Icons.faSnapchat} /></a>;
                        default: return <a key={i} href="#" />;
                        }
                    }));
                }
            });
        window.addEventListener("resize", () => dispatch({ type: "SET_COMMON_DATA", payload: { windowWidth: window.innerWidth } }));
    }, []);

    return (
        <div className={`text-no-drag ${commonState.darkMode ? "dark" : "light"}-mode`}>
            <Head>
                <title>{commonState.title}</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div>
                <h4>페이지 이름.</h4>
            </div>
            <header className="app-header">
                <div className="dark-mode-btn">
                    <span className="font-smoothing">{commonState.darkMode ? "Dark" : "Light"}</span>
                    <div className="font-smoothing"><span style={{ transform: `translateX(${commonState.darkMode ? 11 : -12}px)` }} onClick={() => dispatch({ type: "SET_DARK_MODE" })} /></div>
                </div>
                {editHeaderTitle ?
                    <div>
                        <h1><input type="text" defaultValue={commonState.headerTitle} /></h1>
                        <input type="button" value="등록" />
                        <input type="button" value="취소" onClick={() => setEditHeaderTitle(false)} />
                    </div> :
                    <div>
                        <Link href="/">
                            <h1>{commonState.headerTitle}</h1>
                        </Link>
                        <input type="button" value="편집" onClick={() => setEditHeaderTitle(true)} />
                    </div>}
                {commonState.windowWidth > 1120 ? (
                    <nav>
                        <ul>
                            <li className={router.pathname === "/admin/about" ? "on" : ""}><Link scroll={false} href="/admin/about"><h4>ABOUT</h4></Link></li>
                            <li className={router.pathname === "/admin/movies" ? "on" : ""}><Link scroll={false} href="/admin/movies"><h4>MOVIES</h4></Link></li>
                            <li className={router.pathname === "/admin/drama" ? "on" : ""}><Link scroll={false} href="/admin/drama"><h4>DRAMA</h4></Link></li>
                            <li className={router.pathname === "/admin/theater" ? "on" : ""}><Link scroll={false} href="/admin/theater"><h4>THEATER</h4></Link></li>
                            <li className={router.pathname === "/admin/contact" ? "on" : ""}><Link scroll={false} href="/admin/contact"><h4>CONTACT</h4></Link></li>
                        </ul>
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
                                <ul>
                                    <li className={router.pathname === "/about" ? "on" : ""}><Link scroll={false} href="/about"><h4>ABOUT</h4></Link></li>
                                    <li className={router.pathname === "/movies" ? "on" : ""}><Link scroll={false} href="/movies"><h4>MOVIES</h4></Link></li>
                                    <li className={router.pathname === "/drama" ? "on" : ""}><Link scroll={false} href="/drama"><h4>DRAMA</h4></Link></li>
                                    <li className={router.pathname === "/theater" ? "on" : ""}><Link scroll={false} href="/theater"><h4>THEATER</h4></Link></li>
                                    <li className={router.pathname === "/contact" ? "on" : ""}><Link scroll={false} href="/contact"><h4>CONTACT</h4></Link></li>
                                </ul>
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
        </div>
    );
};

export default AppLayout;
