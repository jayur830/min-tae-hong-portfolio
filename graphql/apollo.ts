import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
	uri: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api/graphql' : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/graphql`,
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
	cache: new InMemoryCache().restore({}),
	link: ApolloLink.from([httpLink, authLink]),
	defaultOptions: {
		watchQuery: {
			fetchPolicy: 'no-cache',
			errorPolicy: 'ignore',
		},
		query: {
			fetchPolicy: 'no-cache',
			errorPolicy: 'all',
		},
	},
});

export default client;
