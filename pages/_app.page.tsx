// Package
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'styled-components';

// Global
import client from '@root/graphql/apollo';
import AppLayout from '@root/components/AppLayout';
import AdminLayout from '@root/components/AdminLayout';
import theme from '!!sass-variable-parser!@root/styles/variables.scss';
import '@root/styles/globals.scss';

// Local

function App({ Component, pageProps }: AppProps) {
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

export default App;
