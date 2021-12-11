import { NextApiRequest, NextApiResponse } from "next";

import fs from "fs";

export default (request: NextApiRequest, response: NextApiResponse) => {
    fs.readFile("assets/data/data.json", "utf8", (error, data) => {
        const _data = JSON.parse(data);
        _data.about.comments = _data.about.comments.concat(request.body);
        fs.writeFile("assets/data/data.json", JSON.stringify(_data, null, 2), "utf8", () => null);
    });
}
