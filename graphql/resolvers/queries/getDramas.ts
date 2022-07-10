import Dramas from '@root/models/dramas';

export const getDramas = async () => {
	return (await (Dramas as any).find({}).exec()).map((obj: any) => ({
		...obj._doc,
		id: obj._id,
	}));
};
