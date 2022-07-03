import { CreateMoviesInput } from '@root/graphql/scheme';

export const Movies_create = (_: any, args: { createMoviesInput: CreateMoviesInput }) => {
	const {
		createMoviesInput: { ...movies },
	} = args;
	/** TODO Implement */
	return {
		...movies,
		id: '-1',
	};
};
