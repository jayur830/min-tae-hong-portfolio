import Footer from '@root/models/footer';

import { nvl } from '@root/utils';

export const getFooter = async () => {
	const data = await (Footer as any).find({}).exec();
	return nvl(data, '0', null);
};
