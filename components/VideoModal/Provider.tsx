import constate from "constate";
import { useState } from "react";

export type VideoModalProps = {
    contents: {
        label: string,
        component: JSX.Element | JSX.Element[]
    }[],
    onSubmit: () => boolean,
    onClose: () => void
};

const useVideoModal = () => {
    const [animateClass, setAnimateClass] = useState<"fadeIn" | "fadeOut">("fadeIn");
    return {
        animateClass,
        setAnimateClass
    };
};

const [
    Provider,
    useAnimateClass,
    useSetAnimateClass
] = constate(
    useVideoModal,
    value => value.animateClass,
    value => value.setAnimateClass
);

export {
    Provider,
    useAnimateClass,
    useSetAnimateClass
};