import Contact from '@root/models/contact';

import { nvl } from '@root/utils';

export const getContact = async () => {
	const data = await (Contact as any).find({}).exec();
	return nvl(data, '0', null);
};
