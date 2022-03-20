import { useEffect, useState } from "react";
import { Common } from "../types";
import constate from "constate";

const AppContext = () => {
    const [common, setCommon] = useState<Common>({
        title: "",
        headerTitle: "",
        darkMode: false,
        windowWidth: 0
    });
    useEffect(() => {
        fetch("/api/common/data")
            .then(response => response.json())
            .then(data => {
                setCommon({
                    title: data.title,
                    headerTitle: data.headerTitle,
                    darkMode: false,
                    windowWidth: window.innerWidth
                });
            });
    }, [setCommon]);

    return { common };
};

const [Provider, useCommon] = constate(
    AppContext,
    value => value.common
);

export { Provider, useCommon };