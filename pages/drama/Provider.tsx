// Package
import constate from 'constate';
import { useQuery } from '@apollo/client';

// Global
import { nvl } from '@root/utils';
import DramaQuery from '@root/graphql/queries/getDramas.gql';
import { Dramas } from '@root/graphql/scheme';

// Local

const useDrama = () => {
	const { data: drama, loading: dramaLoading } = useQuery<{ drama: Dramas }>(DramaQuery);
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

	return { dramaData, dramaLoading };
};

const [Provider, useDramaData, useDramaLoading] = constate(
	useDrama,
	value => value.dramaData,
	value => value.dramaLoading
);

export { Provider, useDramaData, useDramaLoading };
