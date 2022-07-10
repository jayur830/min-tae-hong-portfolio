import { MediaMetadataInput } from '@root/graphql/scheme';
import About from '@root/models/about';

export const AboutImg_update = async (_: any, args: { input: MediaMetadataInput }) => {
	const { input } = args;

	await (About as any).findOneAndUpdate({ $set: { img: input } }).exec();

	return input;
};
