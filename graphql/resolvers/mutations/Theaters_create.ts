import mongoose from 'mongoose';

import { CreateTheatersInput } from '@root/graphql/scheme';
import Theaters from '@root/models/theaters';

export const Theaters_create = async (_: any, args: { createTheatersInput: CreateTheatersInput }) => {
	const { createTheatersInput: input } = args;

	const _id = new mongoose.Types.ObjectId();
	const data = await (Theaters as any).create({
		...input,
		_id,
	});

	return data;
};
