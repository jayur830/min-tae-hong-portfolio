import Theaters from '@root/models/theaters';

export const getTheaters = async () => {
	return (await (Theaters as any).find({}).exec()).map((obj: any) => ({
		...obj._doc,
		id: obj._id,
	}));
};
