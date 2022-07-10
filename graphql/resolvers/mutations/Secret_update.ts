import Secret from '@root/models/secret';

export const Secret_update = async (_: any, args: { newPassword: string }) => {
	try {
		const { newPassword } = args;

		await (Secret as any).findOneAndUpdate({}, { $set: { password: newPassword } }).exec();

		return true;
	} catch (e) {
		return false;
	}
};
