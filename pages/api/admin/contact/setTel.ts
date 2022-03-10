import { NextApiRequest, NextApiResponse } from "next";

import Contact from "../../../../models/contact";

const setTel = (request: NextApiRequest, response: NextApiResponse) => {
    Contact.findOneAndUpdate({}, {
        $set: {
            tel: request.query.tel
        }
    }).exec();
    response.send(200);
};

export default setTel;
