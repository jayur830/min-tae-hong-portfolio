import { NextApiRequest, NextApiResponse } from "next";

import About from "../../../models/about";

const getData = (request: NextApiRequest, response: NextApiResponse) => {
    About.find({}).exec().then(response.json);
};

export default getData;