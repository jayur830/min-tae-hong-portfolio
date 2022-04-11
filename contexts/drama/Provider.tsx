// Package
import constate from 'constate';
import { useQuery } from '@apollo/client';

// Global
import { nvl } from '@root/utils';
import DramaQuery from '@graphql/queries/getDramas.gql';

// Local

const useDrama = () => {
	const { data: drama } = useQuery(DramaQuery);
	const dramaData = nvl(drama, 'dramas', []).reduce((result: any, movie: any) => {
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

	return { dramaData };
};

const [Provider, useDramaData] = constate(useDrama, value => value.dramaData);

export { Provider, useDramaData };
