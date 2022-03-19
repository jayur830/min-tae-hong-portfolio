import React from "react";
import Head from "next/head";
import { useSelector } from "react-redux";

const AppTemplate: (props: { children: React.ReactNode }) => JSX.Element = ({ children }) => {
    const commonState = useSelector((state: any) => state.common);

    return (
        <div className={`text-no-drag ${commonState.darkMode ? "dark" : "light"}-mode`}>
            <Head>
                <title>{commonState.title}</title>
                <meta name="description" content="민태홍 포트폴리오" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {children}
        </div>
    );
};

export default AppTemplate;
