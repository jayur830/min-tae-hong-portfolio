/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
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
		domains: [`${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com`],
	},
};

module.exports = nextConfig;
