import Movies from '@root/models/movies';

export const getMovies = async () => {
	return (await (Movies as any).find({}).exec()).map((obj: any) => ({
		...obj._doc,
		id: obj._id,
	}));
};
