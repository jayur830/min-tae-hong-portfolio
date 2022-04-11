import Home from '@models/home';

export const getHome = async () => {
	return await Home.find({}).exec();
};
