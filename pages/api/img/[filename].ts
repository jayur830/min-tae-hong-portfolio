import { NextApiRequest, NextApiResponse } from "next";

import fs from "fs";

export default async (request: NextApiRequest, response: NextApiResponse) => {
    const img = await new Promise(resolve => fs.readFile("assets/imgs/" + request.query.filename, (error, data) => resolve(data)));
    response.writeHead(200, { "Content-Type": "image/*" });
    response.end(img);
};
