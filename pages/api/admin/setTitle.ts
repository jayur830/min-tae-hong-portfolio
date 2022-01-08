import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

const setTitle = (request: NextApiRequest, response: NextApiResponse) => {
    fs.readFile("assets/data/data.json", "utf8", (error, data) => {
        const _data = JSON.parse(data);
        _data.common.title = request.query.title;
        fs.writeFile("assets/data/data.json", JSON.stringify(_data, null, 2), "utf8", () => null);
    });
};

export default setTitle;
