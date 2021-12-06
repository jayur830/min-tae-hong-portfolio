import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-brands-svg-icons";

type HomeData = {
    title: string
};

type FooterData = {
    sns: {
        name: string,
        url: string
    }[]
};

const AppLayout: NextPage = ({ children }) => {
    const commonState = useSelector((state: any) => state.common);
    const homeState = useSelector((state: any) => state.home);
    const aboutState = useSelector((state: any) => state.about);
    const moviesState = useSelector((state: any) => state.movies);
    const dramaState = useSelector((state: any) => state.drama);
    const theaterState = useSelector((state: any) => state.theater);
    const contactState = useSelector((state: any) => state.contact);
    const footerState = useSelector((state: any) => state.footer);
    const dispatch = useDispatch();

    let [title, setTitle] = useState("");
    let [iconsHtml, setIconsHtml] = useState([<React.Fragment key={0} />]);

    const router = useRouter();

    useEffect(() => {
        fetch("/api/data")
            .then(data => data.json())
            .then(data => {
                if ("title" in data) {
                    dispatch({
                        type: "SET_COMMON_TITLE",
                        payload: {
                            title: data.title
                        }
                    });
                    setTitle(data.title);
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
                if ("movies" in data)
                    dispatch({
                        type: "SET_MOVIES_DATA",
                        payload: data.movies
                    });
                if ("drama" in data)
                    dispatch({
                        type: "SET_DRAMA_DATA",
                        payload: data.drama
                    });
                if ("theater" in data) {
                    let _data: { [year: string]: any[] } = {};
                    data.theater.forEach((obj: any) => {
                        const year = obj.year.toString();
                        if (!(year in _data)) _data[year] = [];
                        _data[year].push({
                            title: obj.title,
                            theater: obj.theater,
                            schedule: obj.schedule,
                            img: { ...obj.img }
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
                        case "instagram": return <a key={i + "-" + obj.name} href={obj.url} target="_blank"><FontAwesomeIcon size="1x" icon={Icons.faInstagram} /></a>;
                        case "facebook": return <a key={i + "-" + obj.name} href={obj.url} target="_blank"><FontAwesomeIcon size="1x" icon={Icons.faFacebook} /></a>;
                        case "twitter": return <a key={i + "-" + obj.name} href={obj.url} target="_blank"><FontAwesomeIcon size="1x" icon={Icons.faTwitter} /></a>;
                        case "line": return <a key={i + "-" + obj.name} href={obj.url} target="_blank"><FontAwesomeIcon size="1x" icon={Icons.faLine} /></a>;
                        case "youtube": return <a key={i + "-" + obj.name} href={obj.url} target="_blank"><FontAwesomeIcon size="1x" icon={Icons.faYoutube} /></a>;
                        case "pinterest": return <a key={i + "-" + obj.name} href={obj.url} target="_blank"><FontAwesomeIcon size="1x" icon={Icons.faPinterest} /></a>;
                        case "tiktok": return <a key={i + "-" + obj.name} href={obj.url} target="_blank"><FontAwesomeIcon size="1x" icon={Icons.faTiktok} /></a>;
                        case "snapchat": return <a key={i + "-" + obj.name} href={obj.url} target="_blank"><FontAwesomeIcon size="1x" icon={Icons.faSnapchat} /></a>;
                        default: return <a key={i} href="#" />;
                        }
                    }));
                }
            });
    }, []);

    return (
        <div className="text-no-drag">
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className="app-header">
                <div>
                    <Link href="/">
                        <h1>{title}</h1>
                    </Link>
                </div>
                <nav>
                    <ul>
                        <li className={router.pathname === "/about" ? "on" : ""}><Link scroll={false} href="/about"><h4>ABOUT</h4></Link></li>
                        <li className={router.pathname === "/movies" ? "on" : ""}><Link scroll={false} href="/movies"><h4>MOVIES</h4></Link></li>
                        <li className={router.pathname === "/drama" ? "on" : ""}><Link scroll={false} href="/drama"><h4>DRAMA</h4></Link></li>
                        <li className={router.pathname === "/theater" ? "on" : ""}><Link scroll={false} href="/theater"><h4>THEATER</h4></Link></li>
                        <li className={router.pathname === "/contact" ? "on" : ""}><Link scroll={false} href="/contact"><h4>CONTACT</h4></Link></li>
                    </ul>
                </nav>
            </header>
            {children}
            <footer className="app-footer">
                <div>©Copyright 2021. All Rights Reserved.</div>
                {iconsHtml}
            </footer>
        </div>
    );
};

export default AppLayout;
