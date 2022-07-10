import Dramas from '@root/models/dramas';

export const Dramas_removeByYear = async (_: any, args: { year: number }) => {
	const { year } = args;

	await Dramas.deleteMany({ year }).exec();

	return year;
};
