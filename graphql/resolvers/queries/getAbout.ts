import About from '@root/models/about';

import { nvl } from '@root/utils';

export const getAbout = async () => {
	const data = await (About as any).find({}).exec();
	return nvl(data, '0', null);
};
