import { ApolloServer } from 'apollo-server-micro';
import { ApolloServerPluginLandingPageDisabled, ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
// import { loadFile } from 'graphql-import-files';

import * as Query from '../../graphql/resolvers/queries';
import * as Mutation from '../../graphql/resolvers/mutations';

import typeDefs from '@graphql/schema.gql';

const resolvers = {
	Query,
	Mutation,
};

export const config = {
	api: {
		bodyParser: false,
		externalResolver: true,
	},
};

const apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
	plugins: [
		process.env.NODE_ENV === 'production'
			? ApolloServerPluginLandingPageDisabled()
			: ApolloServerPluginLandingPageGraphQLPlayground({
					settings: {
						'schema.polling.enable': false,
					},
			  }),
	],
});

const serverStart = apolloServer.start();

export default async function handler(req: any, res: any) {
	await serverStart;
	await apolloServer.createHandler({
		path: '/api/graphql',
	})(req, res);
}
