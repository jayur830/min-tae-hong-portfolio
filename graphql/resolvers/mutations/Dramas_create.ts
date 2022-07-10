import mongoose from 'mongoose';

import { CreateDramasInput } from '@root/graphql/scheme';
import Dramas from '@root/models/dramas';

export const Dramas_create = async (_: any, args: { createDramasInput: CreateDramasInput }) => {
	const { createDramasInput: input } = args;

	const _id = new mongoose.Types.ObjectId();
	const data = await (Dramas as any).create({
		...input,
		_id,
	});

	return data;
};
