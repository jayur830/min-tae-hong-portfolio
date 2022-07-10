import mongoose from 'mongoose';

import Theaters from '@root/models/theaters';

export const Theaters_remove = async (_: any, args: { id: string }) => {
	const { id } = args;

	const _id = new mongoose.Types.ObjectId(id);
	await Theaters.deleteOne({ _id }).exec();

	return id;
};
