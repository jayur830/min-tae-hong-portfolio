import React from "react";

import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

const AppLayout: NextPage = ({ children }) => {
    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className="app-header">
                <div>
                    <Link href="/">
                        <h1>Min Tae Hong</h1>
                    </Link>
                </div>
                <nav>
                    <ul>
                        <li><Link scroll={false} href="/about"><h4>ABOUT</h4></Link></li>
                        <li><Link scroll={false} href="/movies"><h4>MOVIES</h4></Link></li>
                        <li><Link scroll={false} href="/drama"><h4>DRAMA</h4></Link></li>
                        <li><Link scroll={false} href="/theater"><h4>THEATER</h4></Link></li>
                        <li><Link scroll={false} href="/contact"><h4>CONTACT</h4></Link></li>
                    </ul>
                </nav>
            </header>
            {children}
            <footer className="app-footer">
                <div>©Copyright 2021. All Rights Reserved.</div>
                <FontAwesomeIcon size="1x" icon={faInstagram} />
            </footer>
        </div>
    );
};

export default AppLayout;
