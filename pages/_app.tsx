// Package
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'styled-components';

// Global
import client from '@graphql/apollo';
import AppLayout from '@components/AppLayout';
import AdminLayout from '@components/AdminLayout';
import theme from '!!sass-variable-parser!@styles/variables.scss';
import '@styles/globals.scss';

// Local

function MyApp({ Component, pageProps }: AppProps) {
	const { pathname } = useRouter();
	const Layout = pathname.indexOf('/admin') !== -1 ? AdminLayout : AppLayout;

	return (
		<ApolloProvider client={client}>
			<ThemeProvider theme={theme}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</ThemeProvider>
		</ApolloProvider>
	);
}

export default MyApp;
