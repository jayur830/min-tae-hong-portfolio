import React from "react";
import type { AppProps } from "next/app";
import "../styles/globals.scss";

import AppLayout from "../components/AppLayout";

const App = ({ Component, pageProps }: AppProps) => {
    return <AppLayout><Component {...pageProps} /></AppLayout>;
}

export default App;
