import { UpdateMoviesInput } from '@root/graphql/scheme';

export const Movies_update = (_: any, args: { updateMoviesInput: UpdateMoviesInput }) => {
	const {
		updateMoviesInput: { ...movies },
	} = args;
	/** TODO Implement */
	return movies;
};
