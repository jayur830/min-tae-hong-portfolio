import mongoose from 'mongoose';

import Movies from '@root/models/movies';

export const Movies_remove = async (_: any, args: { id: string }) => {
	const { id } = args;

	const _id = new mongoose.Types.ObjectId(id);
	await Movies.deleteOne({ _id }).exec();

	return id;
};
