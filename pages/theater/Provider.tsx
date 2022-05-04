// Package
import constate from 'constate';
import { useQuery } from '@apollo/client';

// Global
import { nvl } from '@root/utils';
import TheaterQuery from '@root/graphql/queries/getTheaters.gql';

// Local

const useTheater = () => {
	const { data: theater, loading: theaterLoading } = useQuery(TheaterQuery);
	const theaterData = nvl(theater, 'theaters', []).reduce((result: any, movie: any) => {
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
			}),
		};
	}, {});

	return { theaterData, theaterLoading };
};

const [Provider, useTheaterData, useTheaterLoading] = constate(
	useTheater,
	value => value.theaterData,
	value => value.theaterLoading
);

export { Provider, useTheaterData, useTheaterLoading };
