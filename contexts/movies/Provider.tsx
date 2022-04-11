// Package
import constate from 'constate';
import { useQuery } from '@apollo/client';

// Global
import { nvl } from '@root/utils';
import MoviesQuery from '@graphql/queries/getMovies.gql';

// Local

const useMovies = () => {
	const { data: movies } = useQuery(MoviesQuery);
	const moviesData = nvl(movies, 'movies', []).reduce((result: any, movie: any) => {
		const { year, ...etc } = movie;
		if (!(year in result))
			result = {
				...result,
				[year]: [],
			};

		return {
			...result,
			[year]: result[year].concat({
				...etc,
				img: etc.img.filename ? etc.img : null,
				video: etc.video.filename ? etc.video : null,
			}),
		};
	}, {});

	return { moviesData };
};

const [Provider, useMoviesData] = constate(useMovies, value => value.moviesData);

export { Provider, useMoviesData };
