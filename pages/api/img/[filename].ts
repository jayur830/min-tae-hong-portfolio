import { NextApiRequest, NextApiResponse } from "next";

import fs from "fs";

const getImage = (request: NextApiRequest, response: NextApiResponse) => {
    fs.readFile("assets/imgs/" + request.query.filename, (error, data) => {
        response.writeHead(200, { "Content-Type": "image/*" });
        response.status(200).end(data);
    });
};

export default getImage;
