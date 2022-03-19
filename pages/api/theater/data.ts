import { NextApiRequest, NextApiResponse } from "next";

import Theaters from "../../../models/theaters";

const getData = (request: NextApiRequest, response: NextApiResponse) => {
    Theaters.find({}).exec().then(response.json);
};

export default getData;