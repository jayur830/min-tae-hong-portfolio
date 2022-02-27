import { NextApiRequest, NextApiResponse } from "next";

import {
    commonCollection,
    homeCollection,
    aboutCollection,
    moviesCollection,
    dramaCollection,
    theaterCollection,
    contactCollection,
    footerCollection
} from "../../assets/ts/db";

const getData = (request: NextApiRequest, response: NextApiResponse) => {
    (async () => {
        let data: any = {
            common: null,
            home: null,
            about: null,
            movies: null,
            drama: null,
            theater: null,
            contact: null,
            footer: null
        };
        data.common = await commonCollection.find().toArray();
        data.home = await homeCollection.find().toArray();
        data.about = await aboutCollection.find().toArray();
        data.movies = await moviesCollection.find().toArray();
        data.drama = await dramaCollection.find().toArray();
        data.theater = await theaterCollection.find().toArray();
        data.contact = await contactCollection.find().toArray();
        data.footer = await footerCollection.find().toArray();
        if (data.common.length === 1) data.common = data.common[0];
        if (data.home.length === 1) data.home = data.home[0];
        if (data.about.length === 1) data.about = data.about[0];
        if (data.movies.length === 1) data.movies = data.movies[0];
        if (data.drama.length === 1) data.drama = data.drama[0];
        if (data.theater.length === 1) data.theater = data.theater[0];
        if (data.contact.length === 1) data.contact = data.contact[0];
        if (data.footer.length === 1) data.footer = data.footer[0];
        response.json(data);
    })();
};

export default getData;
