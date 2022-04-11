import Dramas from '@root/models/dramas';

export const getDramas = async () => {
	return await Dramas.find({}).exec();
};
