import Common from '@models/common';

import { nvl } from '@root/utils';

export const getCommon = async () => {
	const data = await Common.find({}).exec();
	return nvl(data, '0', null);
};
