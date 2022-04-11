// Package
import constate from 'constate';
import { useQuery } from '@apollo/client';

// Global
import { nvl } from '@root/utils';
import HomeQuery from '@graphql/queries/getHome.gql';

// Local

const useHome = () => {
	const { data: home, loading: homeLoading } = useQuery(HomeQuery);
	const homeData = nvl(home, 'home', []);

	return { homeData, homeLoading };
};

const [Provider, useHomeData, useHomeLoading] = constate(
	useHome,
	value => value.homeData,
	value => value.homeLoading
);

export { Provider, useHomeData, useHomeLoading };
