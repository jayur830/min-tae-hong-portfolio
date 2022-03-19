import { NextApiRequest, NextApiResponse } from "next";

import Footer from "../../../models/footer";

const getData = (request: NextApiRequest, response: NextApiResponse) => {
    Footer.find({}).exec().then(data => response.json(data[0]));
};

export default getData;