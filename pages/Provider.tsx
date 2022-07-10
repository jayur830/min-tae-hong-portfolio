// Package
import constate from 'constate';
import { useQuery } from '@apollo/client';

// Global
import { nvl } from '@root/utils';
import HomeQuery from '@root/graphql/queries/getHome.gql';
import { MediaMetadata } from '@root/graphql/scheme';

// Local

const useAppLayout = () => {
	const { data: home, loading: homeLoading } = useQuery<{ home: MediaMetadata }>(HomeQuery);
	const homeData = nvl(home, 'home', []);

	return { homeData, homeLoading };
};

const [Provider, useHomeData, useHomeLoading] = constate(
	useAppLayout,
	value => value.homeData,
	value => value.homeLoading
);

export { Provider, useHomeData, useHomeLoading };
