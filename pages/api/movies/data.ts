import { NextApiRequest, NextApiResponse } from "next";

import Movies from "../../../models/movies";

const getData = (request: NextApiRequest, response: NextApiResponse) => {
    Movies.find({}).exec().then(response.json);
};

export default getData;