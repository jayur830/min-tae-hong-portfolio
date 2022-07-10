/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: false,
	jsconfigPaths: true,
	pageExtensions: ['page.js', 'page.ts', 'page.jsx', 'page.tsx', 'api.js', 'api.ts', 'api.jsx', 'api.tsx'],
	async headers() {
		return [
			{
				source: '/api/:path*',
				headers: [
					{ key: 'Access-Control-Allow-Credentials', value: 'true' },
					{ key: 'Access-Control-Allow-Origin', value: '*' },
					{ key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
					{ key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
				],
			},
		];
	},
	webpack(config, { isServer }) {
		if (!isServer) {
			config.resolve.fallback.fs = false;
		}

		config.module.rules.push({
			test: /\.(graphql|gql)$/,
			exclude: /node_modules/,
			loader: 'graphql-tag/loader',
		});

		return config;
	},
	images: {
		loader: 'imgix',
		path: [`${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com`],
	},
};
