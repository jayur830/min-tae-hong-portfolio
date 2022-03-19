import { NextApiRequest, NextApiResponse } from "next";

import Dramas from "../../../models/dramas";

const getData = (request: NextApiRequest, response: NextApiResponse) => {
    Dramas.find({}).exec().then(response.json);
};

export default getData;