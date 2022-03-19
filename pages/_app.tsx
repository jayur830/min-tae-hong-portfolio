import React from "react";
import { AppContext, AppInitialProps, AppProps } from "next/app";

import wrapper from "../store";

import "../styles/globals.scss";

import AdminLayout from "../components/AdminLayout";
import AppLayout from "../components/AppLayout";
import { useRouter } from "next/router";
import { Provider } from "./Provider";

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <Provider>
            {useRouter().pathname.indexOf("/admin") !== -1 ? (
                <AdminLayout>
                    <Component {...pageProps} />
                </AdminLayout>
            ) : (
                <AppLayout>
                    <Component {...pageProps} />
                </AppLayout>
            )}
        </Provider>
    );
};

App.getInitialProps = async ({ Component, ctx }: AppContext): Promise<AppInitialProps> => {
    let pageProps = {};
    if (Component.getInitialProps)
        pageProps = await Component.getInitialProps(ctx);
    return { pageProps };
};

export default wrapper.withRedux(App);
