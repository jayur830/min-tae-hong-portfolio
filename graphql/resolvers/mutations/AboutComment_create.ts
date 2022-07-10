import mongoose from 'mongoose';

import { nvl } from '@root/utils';
import About from '@root/models/about';

export const AboutComment_create = async (_: any, args: { input: { comment: string; date: string } }) => {
	const input = nvl(args, 'input', {});
	const id = new mongoose.Types.ObjectId();
	const comments = {
		...input,
		_id: id,
	};

	await About.updateOne({}, { $push: { comments } }).exec();

	return {
		...input,
		id,
	};
};
