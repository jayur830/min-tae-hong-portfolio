import Common from '@root/models/common';

import { nvl } from '@root/utils';

export const getCommon = async () => {
	const data = await (Common as any).find({}).exec();
	return nvl(data, '0', null);
};
