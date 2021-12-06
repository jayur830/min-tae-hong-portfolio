import React from "react";
import { AppContext, AppInitialProps, AppProps } from "next/app";

import wrapper from "../store";

import "../styles/globals.scss";

import AppLayout from "../components/AppLayout";

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <AppLayout>
            <Component {...pageProps} />
        </AppLayout>
    );
};

App.getInitialProps = async ({ Component, ctx }: AppContext): Promise<AppInitialProps> => {
    let pageProps = {};
    if (Component.getInitialProps)
        pageProps = await Component.getInitialProps(ctx);
    return { pageProps };
};

export default wrapper.withRedux(App);
