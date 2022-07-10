import { UpdateAboutMetadataInput } from '@root/graphql/scheme';
import About from '@root/models/about';
import { nvl } from '@root/utils';

export const AboutMetadata_update = async (_: any, args: { input: UpdateAboutMetadataInput[] }) => {
	const name = nvl(args, 'input.name', '');
	const metadata = nvl(args, 'input.metadata', []);

	await About.findOneAndUpdate({ $set: { name, metadata } }).exec();

	return { name, metadata };
};
