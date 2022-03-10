import { NextApiRequest, NextApiResponse } from "next";

import Contact from "../../../../models/contact";

const setImgFile = (request: NextApiRequest, response: NextApiResponse) => {
    Contact.findOneAndUpdate({}, {
        $set: {
            img: request.body.img
        }
    }).exec();
    response.send(200);
};

export default setImgFile;
