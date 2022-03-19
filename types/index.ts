type MediaMetadata = {
    filename: string;
    width: number;
    height: number
};

export type Common = {
    title: string;
    headerTitle: string,
    darkMode: boolean,
    windowWidth: number
};

export type About = {
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
    email: string;
    img: MediaMetadata;
};

export type Footer = {
    sns: {
        name: string;
        url: string;
    }[];
};

export type Movies = {
    title: string;
    year: number;
    director: string;
    actors: string[];
    awards: string[];
    img: MediaMetadata;
    video: MediaMetadata;
    scenes: MediaMetadata[]
}[];

export type Dramas = {
    title: string;
    year: number;
    director: string;
    actors: string[];
    schedule: string;
    img: MediaMetadata;
    scenes: MediaMetadata[]
}[];

export type Theaters = {
    title: string;
    theater: string;
    year: number;
    schedule: string;
    img: MediaMetadata;
    scenes: MediaMetadata[]
}[];

export type Secret = {
    password: string
};