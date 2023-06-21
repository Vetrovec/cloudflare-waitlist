/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		ERROR_URL: 'http://127.0.0.1:8788/',
		SUCCESS_URL: 'http://127.0.0.1:8788/{id}',
	},
};

module.exports = nextConfig;
