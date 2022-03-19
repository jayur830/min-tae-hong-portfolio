import { NextApiRequest, NextApiResponse } from "next";

import Contact from "../../../models/contact";

const getData = (request: NextApiRequest, response: NextApiResponse) => {
    Contact.find({}).exec().then(data => response.json(data[0]));
};

export default getData;