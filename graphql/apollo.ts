import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
	uri: '/api/graphql',
	credentials: 'same-origin',
});

const authLink = setContext((_, { headers }) => ({
	headers: {
		...headers,
		'Access-Control-Allow-Origin': '*',
	},
}));

const client = new ApolloClient({
	connectToDevTools: process.env.NODE_ENV !== 'production',
	cache: new InMemoryCache({
		typePolicies: {
			['Query']: {
				fields: {
					['getAbout']: {
						merge(existingData, incomingData) {
							return incomingData;
						},
					},
					['getCommon']: {
						merge(existingData, incomingData) {
							return incomingData;
						},
					},
					['getContact']: {
						merge(existingData, incomingData) {
							return incomingData;
						},
					},
					['getDramas']: {
						merge(existingData, incomingData) {
							return incomingData;
						},
					},
					['getFooter']: {
						merge(existingData, incomingData) {
							return incomingData;
						},
					},
					['getHome']: {
						merge(existingData, incomingData) {
							return incomingData;
						},
					},
					['getMovies']: {
						merge(existingData, incomingData) {
							return incomingData;
						},
					},
					['getTheaters']: {
						merge(existingData, incomingData) {
							return incomingData;
						},
					},
				},
			},
		},
	}).restore({}),
	link: ApolloLink.from([authLink, httpLink]),
	defaultOptions: {
		watchQuery: {
			fetchPolicy: 'cache-first',
			errorPolicy: 'ignore',
		},
		query: {
			fetchPolicy: 'cache-first',
			errorPolicy: 'all',
		},
	},
});

export default client;
