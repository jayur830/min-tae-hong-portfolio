import { GetServerSidePropsContext } from 'next';
import { getServerSideSitemap } from 'next-sitemap';
import dayjs from 'dayjs';

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const lastmod = dayjs().toISOString();

	return getServerSideSitemap(context, [
		{
			loc: process.env.URL as string,
			changefreq: 'daily',
			priority: 0.8,
			lastmod,
		},
	]);
}

export default () => {};
