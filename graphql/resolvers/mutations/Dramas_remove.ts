import mongoose from 'mongoose';

import Dramas from '@root/models/dramas';

export const Dramas_remove = async (_: any, args: { id: string }) => {
	const { id } = args;

	const _id = new mongoose.Types.ObjectId(id);
	await Dramas.deleteOne({ _id }).exec();

	return id;
};
