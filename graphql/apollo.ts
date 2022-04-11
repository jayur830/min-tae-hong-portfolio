import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client';

const httpLink = createHttpLink({
<<<<<<< HEAD
	uri: `http://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/graphql`,
=======
	uri: 'http://localhost:3000/api/graphql',
>>>>>>> dev
});

const client = new ApolloClient({
	connectToDevTools: process.env.NODE_ENV !== 'production',
	cache: new InMemoryCache().restore({}),
	link: ApolloLink.from([httpLink]),
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
