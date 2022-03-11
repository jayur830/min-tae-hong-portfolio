import { NextApiRequest, NextApiResponse } from "next";

import About from "../../../../models/about";

const setImgFile = (request: NextApiRequest, response: NextApiResponse) => {
    About.findOneAndUpdate({}, {
        $set: {
            img: request.body.img
        }
    }).exec();
    response.send(200);
};

export default setImgFile;
