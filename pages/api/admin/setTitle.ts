import { NextApiRequest, NextApiResponse } from "next";

import Common from "../../../models/common";

const setTitle = (request: NextApiRequest, response: NextApiResponse) => {
    Common.findOneAndUpdate({}, {
        $set: {
            title: request.query.title
        }
    }).exec();
    response.send(200);
};

export default setTitle;
