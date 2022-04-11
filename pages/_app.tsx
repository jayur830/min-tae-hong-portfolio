// Package
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from '@apollo/client';

// Global
import AppLayout from '@components/AppLayout';
import client from '@graphql/apollo';
import theme from '!!sass-variable-parser!@styles/variables.scss';
import '@styles/globals.scss';

// Local

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ApolloProvider client={client}>
			<ThemeProvider theme={theme}>
				<AppLayout>
					<Component {...pageProps} />
				</AppLayout>
			</ThemeProvider>
		</ApolloProvider>
	);
}

export default MyApp;
