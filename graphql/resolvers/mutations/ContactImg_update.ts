import { MediaMetadataInput } from '@root/graphql/scheme';
import Contact from '@root/models/contact';

export const ContactImg_update = async (_: any, args: { input: MediaMetadataInput }) => {
	const { input } = args;

	await (Contact as any).findOneAndUpdate({ $set: { img: input } }).exec();

	return input;
};
