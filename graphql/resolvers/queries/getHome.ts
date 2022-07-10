import Home from '@root/models/home';

export const getHome = async () => {
	return await (Home as any).find({}).exec();
};
