import mongoose from 'mongoose';

import { UpdateDramasInput } from '@root/graphql/scheme';
import Dramas from '@root/models/dramas';

export const Dramas_update = async (_: any, args: { updateDramasInput: UpdateDramasInput }) => {
	const { updateDramasInput: input } = args;

	await (Dramas as any).findByIdAndUpdate(new mongoose.Types.ObjectId(input.id), { $set: input }).exec();

	return input;
};
