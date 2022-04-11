// Package
import constate from 'constate';
import { useQuery } from '@apollo/client';

// Global
import { nvl } from '@root/utils';
import HomeQuery from '@graphql/queries/getHome.gql';

// Local

const useHome = () => {
	const { data: home } = useQuery(HomeQuery);
	const homeData = nvl(home, 'home', []);

	return { homeData };
};

const [Provider, useHomeData] = constate(useHome, value => value.homeData);

export { Provider, useHomeData };
