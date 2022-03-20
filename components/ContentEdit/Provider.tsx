import constate from "constate";
import { useState } from "react";

export type ContentEditProps = {
    contents: {
        label: string,
        component: JSX.Element | JSX.Element[]
    }[],
    onSubmit: () => boolean,
    onClose: () => void
};

const useContentEdit = (props: ContentEditProps) => {
    const [animateClass, setAnimateClass] = useState<"fadeIn" | "fadeOut">("fadeIn");
    return {
        animateClass,
        setAnimateClass,
        props
    };
};

const [
    Provider,
    useAnimateClass,
    useSetAnimateClass,
    useProps
] = constate(
    useContentEdit,
    value => value.animateClass,
    value => value.setAnimateClass,
    value => value.props
);

export {
    Provider,
    useAnimateClass,
    useSetAnimateClass,
    useProps
};