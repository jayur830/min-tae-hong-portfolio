import { NextApiRequest, NextApiResponse } from "next";

import Common from "../../../models/common";

const getData = (request: NextApiRequest, response: NextApiResponse) => {
    Common.find({}).exec().then(data => response.json(data[0]));
};

export default getData;