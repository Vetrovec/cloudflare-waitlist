/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		WELCOME_MAIL_URL: '',
		ERROR_URL: '',
		SUCCESS_URL: '',
		EMAIL_ADDRESS: '',
		DKIM_DOMAIN: '',
		DKIM_SELECTOR: '',
		DKIM_PRIVATE_KEY: '',
	},
};

module.exports = nextConfig;
