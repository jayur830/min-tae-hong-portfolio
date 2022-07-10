import Theaters from '@root/models/theaters';

export const Theaters_removeByYear = async (_: any, args: { year: number }) => {
	const { year } = args;

	await Theaters.deleteMany({ year }).exec();

	return year;
};
