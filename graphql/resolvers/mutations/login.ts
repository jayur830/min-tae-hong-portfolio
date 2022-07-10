import crypto from 'crypto';

import Secret from '@root/models/secret';
import { nvl } from '@root/utils';
import { Model } from 'mongoose';

export const login = async (_: any, args: { password: string }) => {
	const { password } = args;
	const inputPassword = crypto.createHash('sha256').update(password).digest('hex');
	const comparePassword = nvl(await (Secret as Model<any>).findOne({}).exec(), 'password', '');
	return inputPassword === comparePassword;
};
