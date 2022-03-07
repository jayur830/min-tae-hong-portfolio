import { NextApiRequest, NextApiResponse } from "next";

import Secret from "../../../models/secret";

const auth = (request: NextApiRequest, response: NextApiResponse) => {
    (async () => {
        const source = request.query.__r_pw;
        const compare = (await Secret.findOne().exec()).password;
        response.send({ isAuthenticated: source === compare });
    })();
};

export default auth;
