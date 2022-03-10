import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-brands-svg-icons";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import crypto from "crypto";
import { useRouter } from "next/router";

export const useInitCommon = (payload: any, dispatch: Dispatch<any>) => {
    dispatch({
        type: "SET_COMMON_DATA",
        payload
    });
};

export const useInitHome = (payload: any, dispatch: Dispatch<any>) => {
    dispatch({
        type: "SET_HOME_DATA",
        payload
    });
};

export const useInitAbout = (payload: any, dispatch: Dispatch<any>) => {
    dispatch({
        type: "SET_ABOUT_DATA",
        payload
    });
};

export const useInitMovie = (payload: any, dispatch: Dispatch<any>) => {
    let _data: { [year: string]: any[] } = {};
    payload.forEach((obj: any) => {
        const year = obj.year.toString();
        if (!(year in _data)) _data[year] = [];
        _data[year].push({
            _id: obj._id,
            title: obj.title,
            director: obj.director,
            actors: Object.freeze(obj.actors),
            awards: Object.freeze(obj.awards),
            img: { ...obj.img },
            video: obj.video == null ? null : { ...obj.video },
            scenes: Object.freeze(obj.scenes),
            scenePage: 0,
            scenePages: Math.ceil(obj.scenes.length / 5),
            sceneIndex: -1
        });
    });
    dispatch({
        type: "SET_MOVIES_DATA",
        payload: _data
    });
};

export const useInitDrama = (payload: any, dispatch: Dispatch<any>) => {
    let _data: { [year: string]: any[] } = {};
    payload.forEach((obj: any) => {
        const year = obj.year.toString();
        if (!(year in _data)) _data[year] = [];
        _data[year].push({
            _id: obj._id,
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
};

export const useInitTheater = (payload: any, dispatch: Dispatch<any>) => {
    let _data: { [year: string]: any[] } = {};
    payload.forEach((obj: any) => {
        const year = obj.year.toString();
        if (!(year in _data)) _data[year] = [];
        _data[year].push({
            _id: obj._id,
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
};

export const useInitContact = (payload: any, dispatch: Dispatch<any>) => {
    dispatch({
        type: "SET_CONTACT_DATA",
        payload
    });
};

export const useInitFooter = (payload: any, dispatch: Dispatch<any>, setIconsHtml: any, setSnsList?: any) => {
    if (setSnsList) setSnsList(Object.freeze(payload.sns.concat()));
    dispatch({
        type: "SET_FOOTER_SNS_LIST",
        payload
    });
    setIconsHtml(payload.sns.map((obj: { name: string, url: string }, i: number) => {
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
};

export const useInitApi = (setIconsHtml: any, setSnsList?: any) => {
    const dispatch = useDispatch();

    useEffect(() => {
        fetch("/api/data")
            .then(data => data.json())
            .then(data => {
                if ("common" in data) useInitCommon({ ...data.common, windowWidth: window.innerWidth }, dispatch);
                if ("home" in data) useInitHome(data.home, dispatch);
                if ("about" in data) useInitAbout(data.about, dispatch);
                if ("movies" in data) useInitMovie(data.movies, dispatch);
                if ("drama" in data) useInitDrama(data.drama, dispatch);
                if ("theater" in data) useInitTheater(data.theater, dispatch);
                if ("contact" in data) useInitContact(data.contact, dispatch);
                if ("footer" in data) useInitFooter(data.footer, dispatch, setIconsHtml, setSnsList);
            });
        window.addEventListener("resize", () => dispatch({
            type: "SET_COMMON_DATA",
            payload: { windowWidth: window.innerWidth }
        }));
    }, []);
};

export const useAuthenticate = () => {
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const authTime = sessionStorage.getItem("auth_tm");
            // After 30 minutes, Re-authenticate
            if (authTime == null || Math.abs(new Date().getTime() - +authTime) > 30 * 60 * 1000) {
                const password = prompt("비밀번호를 입력하세요.") as string;
                if (password == null) router.back();
                const { isAuthenticated } = await fetch("/api/admin/auth?__r_pw=" + crypto.createHash("sha256").update(password).digest("hex")).then((response: any) => response.json());
                if (!isAuthenticated) {
                    alert("권한이 없습니다.");
                    router.back();
                } else sessionStorage.setItem("auth_tm", new Date().getTime().toString());
            } else sessionStorage.setItem("auth_tm", new Date().getTime().toString());
        })();
    }, [router]);
};

export const useImgUpload = (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    fetch("/api/admin/uploadImg", {
        method: "POST",
        headers: {},
        body: formData
    });
};