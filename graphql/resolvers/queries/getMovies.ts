import Movies from '@models/movies';

export const getMovies = async () => {
	return await Movies.find({}).exec();
};
