import { NextApiRequest, NextApiResponse } from "next";

import fs from "fs";

export default (request: NextApiRequest, response: NextApiResponse) => {
    fs.readFile("assets/data/data.json", "utf8", (error, data) => response.json(data));
}
