import mongoose from 'mongoose';

import { UpdateTheatersInput } from '@root/graphql/scheme';
import Theaters from '@root/models/theaters';

export const Theaters_update = async (_: any, args: { updateTheatersInput: UpdateTheatersInput }) => {
	const { updateTheatersInput: input } = args;

	await (Theaters as any).findByIdAndUpdate(new mongoose.Types.ObjectId(input.id), { $set: input }).exec();

	return input;
};
