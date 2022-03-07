import { NextApiRequest, NextApiResponse } from "next";

import Footer from "../../../../models/footer";

const setSns = (request: NextApiRequest, response: NextApiResponse) => {
    Footer.findOneAndUpdate({}, {
        $set: {
            sns: request.body.sns
        }
    }).exec();
};

export default setSns;
