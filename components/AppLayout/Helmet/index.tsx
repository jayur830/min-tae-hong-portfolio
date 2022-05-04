// Package
import Head from 'next/head';

// Global
import { nvl } from '@root/utils';
import { useCommonData } from '@root/contexts/Provider';

// Local

const Helmet = () => {
	const commonData = useCommonData();

	return (
		<Head>
			<title>{nvl(commonData, 'title', '')}</title>
			<meta name="description" content="민태홍 포트폴리오" />
			<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no" />
			<meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
			<link rel="icon" href="/favicon.ico" />
		</Head>
	);
};

export default Helmet;
