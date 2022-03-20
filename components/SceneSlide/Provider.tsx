import constate from "constate";

type Props = {
    type: "movies" | "drama" | "theater",
    year: string,
    i: number,
    scenePage: number,
    scenes: any[],
    setScene: any
};

const useSceneSlide = (props: Props) => {

    return { props };
};

const [
    Provider,
    useProps
] = constate(
    useSceneSlide,
    value => value.props
);

export {
    Provider,
    useProps
};