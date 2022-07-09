import mongoose from 'mongoose';

import { UpdateMoviesInput } from '@root/graphql/scheme';
import Movies from '@root/models/movies';

export const Movies_update = async (_: any, args: { updateMoviesInput: UpdateMoviesInput }) => {
	const { updateMoviesInput: input } = args;

	await Movies.findByIdAndUpdate(new mongoose.Types.ObjectId(input.id), { $set: input }).exec();

	return input;
};
