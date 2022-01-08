import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcons from "@fortawesome/free-solid-svg-icons";
import * as BrandsIcons from "@fortawesome/free-brands-svg-icons";

const AdminLayout: NextPage = ({ children }) => {
    const dispatch = useDispatch();

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

    const router = useRouter();

    useEffect(() => {
        fetch("/api/data")
            .then(data => data.json())
            .then(data => {
                if ("common" in data) {
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
                    setSnsList(Object.freeze(data.footer.sns.concat()));
                    dispatch({
                        type: "SET_FOOTER_SNS_LIST",
                        payload: data.footer
                    });
                    setIconsHtml(data.footer.sns.map((obj: { name: string, url: string }, i: number) => {
                        switch (obj.name) {
                        case "instagram": return <a key={i + "-" + obj.name} href={obj.url} target="_blank" rel="noreferrer"><FontAwesomeIcon size="1x" icon={BrandsIcons.faInstagram} /></a>;
                        case "facebook": return <a key={i + "-" + obj.name} href={obj.url} target="_blank" rel="noreferrer"><FontAwesomeIcon size="1x" icon={BrandsIcons.faFacebook} /></a>;
                        case "twitter": return <a key={i + "-" + obj.name} href={obj.url} target="_blank" rel="noreferrer"><FontAwesomeIcon size="1x" icon={BrandsIcons.faTwitter} /></a>;
                        case "line": return <a key={i + "-" + obj.name} href={obj.url} target="_blank" rel="noreferrer"><FontAwesomeIcon size="1x" icon={BrandsIcons.faLine} /></a>;
                        case "youtube": return <a key={i + "-" + obj.name} href={obj.url} target="_blank" rel="noreferrer"><FontAwesomeIcon size="1x" icon={BrandsIcons.faYoutube} /></a>;
                        case "pinterest": return <a key={i + "-" + obj.name} href={obj.url} target="_blank" rel="noreferrer"><FontAwesomeIcon size="1x" icon={BrandsIcons.faPinterest} /></a>;
                        case "tiktok": return <a key={i + "-" + obj.name} href={obj.url} target="_blank" rel="noreferrer"><FontAwesomeIcon size="1x" icon={BrandsIcons.faTiktok} /></a>;
                        case "snapchat": return <a key={i + "-" + obj.name} href={obj.url} target="_blank" rel="noreferrer"><FontAwesomeIcon size="1x" icon={BrandsIcons.faSnapchat} /></a>;
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
                        <Link href="/admin">
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
                                            }}>
                                                <option value="instagram">Instagram</option>
                                                <option value="facebook">Facebook</option>
                                                <option value="twitter">Twitter</option>
                                                <option value="line">Line</option>
                                                <option value="youtube">Youtube</option>
                                                <option value="pinterest">Pinterest</option>
                                                <option value="tiktok">Tiktok</option>
                                                <option value="snapchat">Snapchat</option>
                                            </select>
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
                                    <tr>
                                        <td>
                                            <select value={sns.name}>
                                                <option value="instagram">Instagram</option>
                                                <option value="facebook">Facebook</option>
                                                <option value="twitter">Twitter</option>
                                                <option value="line">Line</option>
                                                <option value="youtube">Youtube</option>
                                                <option value="pinterest">Pinterest</option>
                                                <option value="tiktok">Tiktok</option>
                                                <option value="snapchat">Snapchat</option>
                                            </select>
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
