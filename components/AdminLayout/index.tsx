import React from "react";
import { NextPage } from "next";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcons from "@fortawesome/free-solid-svg-icons";

import DarkModeButton from "../DarkModeButton";
import AppTemplate from "../AppTemplate";

import BlackButton from "../BlackButton";
import WhiteButton from "../WhiteButton";

import { useCommon, useSetCommon } from "../../pages/Provider";
import {
    Provider,
    useFooter,
    useSetFooter,
    useIconsHtml,
    useSetIconsHtml,
    useOpenSideMenu,
    useSetOpenSideMenu,
    useEditTitle,
    useSetEditTitle,
    useEditHeaderTitle,
    useSetEditHeaderTitle,
    useEditSnsList,
    useSetEditSnsList,
    useTitle,
    useSetTItle,
    useHeaderTitle,
    useSetHeaderTItle,
    useSnsList,
    useSetSnsList,
    useCommitTitle,
    useCommitHeaderTitle,
    useCommitFooterSnsList,
    useLinkList,
    useSnsOptions
} from "./Provider";

const AdminLayout: NextPage = ({ children }) => {
    const common = useCommon();
    const footer = useFooter();
    const iconsHtml = useIconsHtml();
    const openSideMenu = useOpenSideMenu();
    const setOpenSideMenu = useSetOpenSideMenu();
    const editTitle = useEditTitle();
    const setEditTitle = useSetEditTitle();
    const editHeaderTitle = useEditHeaderTitle();
    const setEditHeaderTitle = useSetEditHeaderTitle();
    const editSnsList = useEditSnsList();
    const setEditSnsList = useSetEditSnsList();
    const title = useTitle();
    const setTItle = useSetTItle();
    const headerTitle = useHeaderTitle();
    const setHeaderTItle = useSetHeaderTItle();
    const snsList = useSnsList();
    const setSnsList = useSetSnsList();
    const commitTitle = useCommitTitle();
    const commitHeaderTitle = useCommitHeaderTitle();
    const commitFooterSnsList = useCommitFooterSnsList();
    const linkList = useLinkList();
    const snsOptions = useSnsOptions();

    return (
        <AppTemplate>
            {editTitle ? (
                <article className="title">
                    <h4>페이지 타이틀.</h4>
                    <input type="text" defaultValue={common.title} onKeyUp={(e: any) => {
                        if (e.key === "Enter") commitTitle(common._id as string, e.target.value);
                        else setTItle(e.target.value);
                    }} />
                    <BlackButton onClick={() => commitTitle(common._id as string, title)}>등록</BlackButton>
                    <BlackButton onClick={() => setEditTitle(false)}>취소</BlackButton>
                </article>
            ) : (
                <article className="title">
                    <h4>페이지 타이틀.</h4>
                    <span>{common.title}</span>
                    {/*<BlackButton onClick={() => setEditTitle(true)}>편집</BlackButton>*/}
                    <button onClick={() => setEditTitle(true)}>편집</button>
                </article>
            )}
            <header className="app-header">
                <DarkModeButton />
                {editHeaderTitle ?
                    <div>
                        <h1><input type="text" defaultValue={common.headerTitle} onKeyUp={(e: any) => {
                            if (e.key === "Enter") commitHeaderTitle(common._id as string, e.target.value);
                            else setHeaderTItle(e.target.value);
                        }} /></h1>
                        <BlackButton onClick={() => commitHeaderTitle(common._id as string, headerTitle)}>등록</BlackButton>
                        <BlackButton onClick={() => setEditHeaderTitle(false)}>취소</BlackButton>
                    </div> :
                    <div>
                        <Link href="/admin" passHref>
                            <h1>{common.headerTitle}</h1>
                        </Link>
                        {/*<BlackButton onClick={() => setEditHeaderTitle(true)}>편집</BlackButton>*/}
                        <button onClick={() => setEditHeaderTitle(true)}>편집</button>
                    </div>}
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
                                                if (e.key === "Enter")
                                                    commitFooterSnsList(footer._id as string, snsList.filter((obj: { name: string, url: string }) => obj.url !== ""));
                                                else {
                                                    const _snsList = snsList.concat();
                                                    _snsList[i].url = e.target.value;
                                                    setSnsList(_snsList);
                                                }
                                            }} />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon size="1x" icon={SolidIcons.faMinusCircle} onClick={() => setSnsList(snsList.filter((_: any, j: number) => i !== j))} />
                                        </td>
                                    </tr>
                                )))}
                                <tr>
                                    <td colSpan={3}>
                                        <FontAwesomeIcon icon={SolidIcons.faPlus} onClick={() => {
                                            setSnsList(snsList.concat({
                                                name: "instagram",
                                                url: ""
                                            }));
                                        }} />
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                            <tr>
                                <td colSpan={3}>
                                    <WhiteButton onClick={() => commitFooterSnsList(footer._id as string, snsList.filter((obj: { name: string, url: string }) => obj.url !== ""))}>등록</WhiteButton>
                                    <WhiteButton onClick={() => {
                                        setSnsList(footer.sns.concat());
                                        setEditSnsList(false);
                                    }}>취소</WhiteButton>
                                </td>
                            </tr>
                            </tfoot>
                        </table>
                    </>
                ) : (
                    <>
                        {iconsHtml}
                        {/*<WhiteButton onClick={() => setEditSnsList(true)}>편집</WhiteButton>*/}
                        <input type="button" defaultValue="편집" onClick={() => setEditSnsList(true)} />
                    </>
                )}
            </footer>
        </AppTemplate>
    );
};

const _AdminLayout = (props: any) => (
    <Provider>
        <AdminLayout {...props} />
    </Provider>
);

export default _AdminLayout;