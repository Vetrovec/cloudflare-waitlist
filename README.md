# cloudflare-waitlist

A free-to-host, lightweight & customizable waitlist site, powered by [Cloudflare Workers](https://workers.cloudflare.com/) and [Next.js](https://nextjs.org/).

![preview](/docs/preview.png)

See [live demo](https://waitlist.vetrovec.com/).

## Features

- Responsive, easily customizable template
- Captcha protection provided by [Turnstile](https://www.cloudflare.com/products/turnstile/)
- Welcome email with DKIM support
- Link-based referral system

## Customization

**Images**

You can replace all images in the `/public` directory. Make sure to keep the same file names and dimensions, otherwise you might need to update the code.

**Language**

Most phrases can be found in the `/messages.json` file. Some texts can be configured in `/content.json` file, for example title, description and welcome email properties. Welcome email content is configured separately.

**Links**

Links containting socials can be found in `/content.json` file. Feel free to remove or add more links, just make sure to add the corresponding icons to `/public/socials` directory and keep the same 24x24 dimensions. You can also hide Github top right corner badge by changing *showGithubBadge* in `/content.json` to false.

**Colors**

You can find used color palette in `/tailwind.config.mjs` file. Only default tailwind colors are used, but you can easily override them with your own colors. For more information about tailwind colors, see [here](https://tailwindcss.com/docs/customizing-colors).

**Welcome email**

Content of welcome email is located in `/public/welcome-email.html` file. You can either modify the text or replace the whole file with your own template. Keep in mind the email content should be self-contained document and it should not have any relative references. If you need to include an image, use absolute URL or base64 encoded image. You can use *{base_url}* variable to create absolute links.

## Deployment

To deploy this project to Cloudflare, you will need to have a Cloudflare account. Having custom domain is not necessary, but it is strongly recommended.
You can choose one of two approaches for deployment, either publish this to git and connect it directly to Cloudflare, or build it locally and upload output to Cloudflare. First start with common steps, then proceed to the approach of your choice.

**Setup Wrangler**

1. Install Wrangler

Either install globally or use npx.

``` bash
$ npm install -g wrangler
```

2. Login to Wrangler

``` bash
$ wrangler login
```

3. Create wrangler.toml from template

``` bash
$ cp wrangler.toml.example wrangler.toml
```

**Setup D1 database**

1. Create a new D1 database

``` bash
$ wrangler d1 create <database-name>
```

2. Add database credentials to wrangler.toml

3. Run setup migration

``` bash
$ wrangler d1 execute <database-name> --file migrations/001_setup.sql  
```

**Add site to Turnstile (optional)**

This step requires custom domain. You can use Turnstile captcha protection to prevent spam email joins. Simply Add new site in Turnstile console and save site key and secret for later use.

**Setup DKIM (optional)**

This step requires custom domain. DKIM is used to prevent emails from being marked as spam.
However, it is not necessary to setup DKIM, as it is not required for emails to be sent.

### Connect Git

*This approach is not supported at the time of writing. Building projects with D1 binding fails. See [this issue](https://github.com/cloudflare/next-on-pages/issues/302) for more information.*

### Local build and upload

**Install dependencies**

Install necessary dependencies in the project root directory.

``` bash
$ npm install
```

**Configure local environment variables**

Create .env file in the project root directory and fill in the necessary environment variables. Use .env.example as a template. You might need DKIM and Turnstile credentials from previous steps.

``` bash
$ cp .env.example .env
```

**Export project**

After finishing all the steps above and finishing customizations, you can export the project to `.vercel` folder.

``` bash
$ npm run export
```

**Deploy project to pages**

Deploy the project to Cloudflare Pages using Wrangler. Do not forget to add required compatibility settings and environment variables to the project. You can find more information about Cloudflare Pages [here](https://www.npmjs.com/package/@cloudflare/next-on-pages#user-content-3-deploy-your-application-to-cloudflare-pages).

``` bash
$ wrangler pages deploy .vercel/output/static
```

## License

[MIT](LICENSE.md)
