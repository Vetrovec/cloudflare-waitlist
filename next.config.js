/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		unoptimized: true,
	},
	env: {
		WELCOME_MAIL_URL: '',
		ERROR_URL: '',
		SUCCESS_URL: '',
		REFERRAL_URL: '',
		EMAIL_ADDRESS: '',
		DKIM_DOMAIN: '',
		DKIM_SELECTOR: 'mailchannels',
		DKIM_PRIVATE_KEY: '',
		TURNSTILE_ENABLED: 'true',
		TURNSTILE_SECRET_KEY: '',
	},
};

module.exports = nextConfig;
