import React, { ReactNode } from "react";
import Head from "next/head";
import { useCommon } from "../../pages/Provider";

type Props = {
    children: ReactNode
};

const AppTemplate = ({ children }: Props) => {
    const common = useCommon();

    return (
        <div className={`text-no-drag ${common.darkMode ? "dark" : "light"}-mode`}>
            <Head>
                <title>{common.title}</title>
                <meta name="description" content="민태홍 포트폴리오" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {children}
        </div>
    );
};

export default AppTemplate;