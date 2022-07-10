import Contact from '@root/models/contact';

export const ContactEmail_update = async (_: any, args: { email: string }) => {
	const { email } = args;

	await (Contact as any).findOneAndUpdate({ $set: { email } }).exec();

	return email;
};
