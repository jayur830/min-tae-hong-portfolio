import Theaters from '@root/models/theaters';

export const getTheaters = async () => {
	return await Theaters.find({}).exec();
};
