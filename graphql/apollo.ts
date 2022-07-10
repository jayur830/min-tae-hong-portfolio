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
						merge: true,
					},
					['getCommon']: {
						merge: true,
					},
					['getContact']: {
						merge: true,
					},
					['getDramas']: {
						merge: false,
					},
					['getFooter']: {
						merge: true,
					},
					['getHome']: {
						merge: false,
					},
					['getMovies']: {
						merge: false,
					},
					['getTheaters']: {
						merge: false,
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
			fetchPolicy: 'network-only',
			errorPolicy: 'all',
		},
	},
});

export default client;
