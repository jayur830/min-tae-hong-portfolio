import Movies from '@root/models/movies';

export const getMovies = async () => {
	return await Movies.find({}).exec();
};
