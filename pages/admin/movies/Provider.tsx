// Package
import constate from 'constate';
import { useQuery } from '@apollo/client';

// Global
import { nvl } from '@root/utils';
import MoviesQuery from '@root/graphql/queries/getMovies.gql';

// Local

const useMovies = () => {
	const { data: movies, loading: moviesLoading } = useQuery(MoviesQuery);
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

	return { moviesData, moviesLoading };
};

const [Provider, useMoviesData, useMoviesLoading] = constate(
	useMovies,
	value => value.moviesData,
	value => value.moviesLoading
);

export { Provider, useMoviesData, useMoviesLoading };
