import { NextApiRequest, NextApiResponse } from "next";

import fs from "fs";

export default async (request: NextApiRequest, response: NextApiResponse) => {
    response.json(await new Promise(resolve => fs.readFile("assets/data/data.json", "utf8", (error, data) => resolve(data))));
}
