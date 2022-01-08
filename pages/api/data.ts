import { NextApiRequest, NextApiResponse } from "next";

import fs from "fs";

const getData = (request: NextApiRequest, response: NextApiResponse) => {
    fs.readFile("assets/data/data.json", "utf8", (error, data) => response.json(data));
};

export default getData;
