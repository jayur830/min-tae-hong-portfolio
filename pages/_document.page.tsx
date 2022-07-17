import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
				});

			const initialProps = await Document.getInitialProps(ctx);

			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>
				),
			};
		} finally {
			sheet.seal();
		}
	}

	render() {
		return (
			<Html>
				<Head>
					<meta name="description" content="민태홍 포트폴리오" />
					<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no" />
					<meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
					<meta name="og:type" content="website" />
					<meta name="og:site_name" content="민태홍 포트폴리오" />
					<meta name="og:url" content="https://min-tae-hong-portfolio.herokuapp.com" />
					<meta name="keywords" content="민태홍, 태홍, 포트폴리오, min tae hong, portfolio" />
					<meta name="title" content="민태홍, 태홍, 포트폴리오, min tae hong, portfolio" />
					<meta name="google-site-verification" content={process.env.GOOGLE_SITE_VERIFICATION} />
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
