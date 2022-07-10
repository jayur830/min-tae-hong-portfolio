import mongoose from 'mongoose';

import { CreateMoviesInput } from '@root/graphql/scheme';
import Movies from '@root/models/movies';

export const Movies_create = async (_: any, args: { createMoviesInput: CreateMoviesInput }) => {
	const { createMoviesInput: input } = args;

	const _id = new mongoose.Types.ObjectId();
	const data = await (Movies as any).create({
		...input,
		_id,
	});

	return data;
};
