export type MediaMetadata = {
    filename: string;
    width: number;
    height: number
};

export type Common = {
    _id?: string;
    title: string;
    headerTitle: string,
    darkMode: boolean,
    windowWidth: number
};

export type About = {
    _id?: string;
    name: string;
    birth: string;
    info: string;
    metadata: {
        label: string;
        value: string;
    }[];
    img: MediaMetadata;
    comments: {
        comment: string;
        date: string;
        secret: boolean;
    }[];
};

export type Contact = {
    _id?: string;
    email: string;
    img: MediaMetadata;
};

export type Footer = {
    _id?: string;
    sns: {
        name: string;
        url: string;
    }[];
};

export type Movies = {
    [year: string]: {
        _id?: string,
        title: string,
        director: string,
        actors: string[],
        awards: string[],
        img: {
            filename: string,
            width: number,
            height: number
        },
        video: {
            filename: string,
            width: number,
            height: number
        } | {
            url: string,
            width: number,
            height: number
        } | null,
        scenes: {
            filename: string,
            width: number,
            height: number
        }[],
        scenePage: number,
        scenePages: number,
        sceneIndex: number
    }[]
};

export type Dramas = {
    _id?: string;
    title: string;
    year: number;
    director: string;
    actors: string[];
    schedule: string;
    img: MediaMetadata;
    scenes: MediaMetadata[]
}[];

export type Theaters = {
    [year: string]: {
        _id?: string,
        title: string,
        theater: string,
        schedule: string,
        img: {
            filename: string,
            width: number,
            height: number
        },
        scenes: {
            filename: string,
            width: number,
            height: number
        }[],
        scenePage: number,
        scenePages: number,
        sceneIndex: number
    }[]
};

export type Secret = {
    _id?: string;
    password: string
};