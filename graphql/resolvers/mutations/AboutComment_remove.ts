import { nvl } from '@root/utils';
import About from '@root/models/about';

export const AboutComment_remove = async (_: any, args: { id: string }) => {
	const _id = nvl(args, 'id', '');

	await (About as any).updateOne({}, { $pull: { comments: { _id } } }).exec();

	return _id;
};
