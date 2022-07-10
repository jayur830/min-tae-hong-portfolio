// Package
import { Fragment } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ApolloProvider } from '@apollo/client';
import { ConfigProvider } from 'antd';
import koKR from 'antd/lib/locale/ko_KR';
import { ThemeProvider } from 'styled-components';

// Global
import client from '@root/graphql/apollo';
import RouteGuard from '@root/components/RouteGuard';
import AppLayout from '@root/components/AppLayout';
import theme from '!!sass-variable-parser!@root/styles/variables.scss';
import '@root/styles/globals.scss';

// Local

function App({ Component, pageProps }: AppProps) {
	const { pathname } = useRouter();
	const Layout = pathname.indexOf('/admin') !== -1 ? RouteGuard : pathname.indexOf('/login') === -1 ? AppLayout : Fragment;

	return (
		<ConfigProvider locale={koKR} virtual>
			<ApolloProvider client={client}>
				<ThemeProvider theme={theme}>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</ThemeProvider>
			</ApolloProvider>
		</ConfigProvider>
	);
}

export default App;
