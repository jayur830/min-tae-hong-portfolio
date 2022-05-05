// Package
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ApolloProvider } from '@apollo/client';
import koKR from 'antd/lib/locale/ko_KR';
import { ThemeProvider } from 'styled-components';

// Global
import client from '@root/graphql/apollo';
import AppLayout from '@root/components/AppLayout';
import AdminLayout from '@root/components/AdminLayout';
import theme from '!!sass-variable-parser!@root/styles/variables.scss';
import '@root/styles/globals.scss';
import { ConfigProvider } from 'antd';

// Local

function App({ Component, pageProps }: AppProps) {
	const { pathname } = useRouter();
	const Layout = pathname.indexOf('/admin') !== -1 ? AdminLayout : AppLayout;

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
