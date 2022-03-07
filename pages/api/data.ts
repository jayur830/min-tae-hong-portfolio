import { NextApiRequest, NextApiResponse } from "next";

import Common from "../../models/common";
import Home from "../../models/home";
import About from "../../models/about";
import Movies from "../../models/movies";
import Dramas from "../../models/dramas";
import Theaters from "../../models/theaters";
import Contact from "../../models/contact";
import Footer from "../../models/footer";

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
        }, count = 0;
        (async () => {
            data.common = await Common.find({}).exec();
            if (data.common.length === 1) data.common = data.common[0];
            ++count;
        })();
        (async () => {
            data.home = await Home.find({}).exec();
            if (data.home.length === 1) data.home = data.home[0];
            ++count;
        })();
        (async () => {
            data.about = await About.find({}).exec();
            if (data.about.length === 1) data.about = data.about[0];
            ++count;
        })();
        (async () => {
            data.movies = await Movies.find({}).exec();
            if (data.movies.length === 1) data.movies = data.movies[0];
            ++count;
        })();
        (async () => {
            data.drama = await Dramas.find({}).exec();
            if (data.drama.length === 1) data.drama = data.drama[0];
            ++count;
        })();
        (async () => {
            data.theater = await Theaters.find({}).exec();
            if (data.theater.length === 1) data.theater = data.theater[0];
            ++count;
        })();
        (async () => {
            data.contact = await Contact.find({}).exec();
            if (data.contact.length === 1) data.contact = data.contact[0];
            ++count;
        })();
        (async () => {
            data.footer = await Footer.find({}).exec();
            if (data.footer.length === 1) data.footer = data.footer[0];
            ++count;
        })();
        while (count < 8) {
            await new Promise(resolve => setTimeout(resolve, 10));
        }
        response.json(data);
    })();
};

export default getData;
