// Package
import Head from 'next/head';

// Global
import { nvl } from '@root/utils';
import { useCommonData } from '@contexts/Provider';

// Local

const Helmet = () => {
	const commonData = useCommonData();

	return (
		<Head>
			<title>{nvl(commonData, 'title', '')}</title>
			<meta name="description" content="민태홍 포트폴리오" />
			<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
			<link rel="icon" href="/favicon.ico" />
		</Head>
	);
};

export default Helmet;
