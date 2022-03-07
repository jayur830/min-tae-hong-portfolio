import { NextApiRequest, NextApiResponse } from "next";

import About from "../../../../models/about";

const setMetadata = (request: NextApiRequest, response: NextApiResponse) => {
    About.findOneAndUpdate({}, {
        $set: {
            metadata: request.body.metadata
        }
    }).exec();
};

export default setMetadata;
