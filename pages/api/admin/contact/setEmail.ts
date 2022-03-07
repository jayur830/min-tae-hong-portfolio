import { NextApiRequest, NextApiResponse } from "next";

import Contact from "../../../../models/contact";

const setEmail = (request: NextApiRequest, response: NextApiResponse) => {
    Contact.findOneAndUpdate({}, {
        $set: {
            email: request.query.email
        }
    });
};

export default setEmail;
