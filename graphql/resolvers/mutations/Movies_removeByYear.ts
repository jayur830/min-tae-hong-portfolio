import Movies from '@root/models/movies';

export const Movies_removeByYear = async (_: any, args: { year: number }) => {
	const { year } = args;

	await Movies.deleteMany({ year }).exec();

	return year;
};
