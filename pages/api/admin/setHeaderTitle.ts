import { NextApiRequest, NextApiResponse } from "next";

import Common from "../../../models/common";

const setHeaderTitle = (request: NextApiRequest, response: NextApiResponse) => {
    Common.findOneAndUpdate({}, {
        $set: {
            headerTitle: request.query.headerTitle
        }
    }).exec();
};

export default setHeaderTitle;
