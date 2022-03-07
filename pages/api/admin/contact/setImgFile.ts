import { NextApiRequest, NextApiResponse } from "next";

import Contact from "../../../../models/contact";

const setImgFile = (request: NextApiRequest, response: NextApiResponse) => {
    Contact.findOneAndUpdate({}, {
        $set: {
            img: request.body.img
        }
    });
};

export default setImgFile;
