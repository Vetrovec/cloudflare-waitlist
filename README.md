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

Links containting socials can be found in `/content.json` file. Feel free to remove or add more links, just make sure to add the corresponding icons to `/public/socials` directory and keep the same 24x24 dimensions. You can also hide Github top right corner badge by changing _showGithubBadge_ in `/content.json` to false.

**Colors**

You can find used color palette in `/tailwind.config.mjs` file. Only default tailwind colors are used, but you can easily override them with your own colors. For more information about tailwind colors, see [here](https://tailwindcss.com/docs/customizing-colors).

**Welcome email**

Content of welcome email is located in `/public/welcome-email.html` file. You can either modify the text or replace the whole file with your own template. Keep in mind the email content should be self-contained document and it should not have any relative references. If you need to include an image, use absolute URL or base64 encoded image. You can use _{base_url}_ variable to create absolute links.

## Deploy to Cloudflare

Prerequisite is to have a Cloudflare account. Having custom domain is not necessary, but required for certain features and also strongly recommended. The following steps describe importing Git repository through Cloudflare, but you can also build this project locally and use Wrangler to upload it manually.

**1. Fork this repository**

You will need to have this project in your own account. You can either fork this repository or create a new one and copy the files. Cloudflare supports importing only from Github and Gitlab at the time of writing.

**2. Customize the project**

Follow the customization steps above to customize the project to your liking.

**3. Create D1 database**

Go to Cloudflare dashboard and create a new D1 database. After creating the database, you will need to run setup migration to create necessary tables. Open file _migrations/001_setup.sql_, go to tab _Console_ in D1 dashboard and paste the content of the file into the console. Then execute the query.

**4. Add site to Turnstile (optional)**

This step requires custom domain. You can use Turnstile to prevent spam submissions. Go to Cloudflare dashboard and open Turnstile. Click on _Add site_ and follow the instructions. Save Site Key and Secret Key for later use.

**5. Set up DKIM records (optional)**

Setting up DKIM requires you to generate a key pair and add the public key to your DNS records. Follow [this mailchannels article](https://support.mailchannels.com/hc/en-us/articles/7122849237389-Adding-a-DKIM-Signature) and save the private key for later use.

**6. Create Cloudflare Pages project**

Go to Cloudflare dashboard and create a new Pages project. Select your waitlist repository and begin setup. Select _Next.js_ as a framework preset. Then expand _Environment variables (advanced)_ and add the following variables:

| Name                           | Value                            | Required |
| ------------------------------ | -------------------------------- | -------- |
| NODE_VERSION                   | 18                               | yes      |
| DKIM_ENABLED                   | false/true                       | yes      |
| DKIM_SELECTOR                  | mailchannels                     |
| DKIM_DOMAIN                    | _your domain_                    |
| DKIM_PRIVATE_KEY               | _your private key_               |
| NEXT_PUBLIC_BASE_URL           | _your domain_                    | yes      |
| NEXT_PUBLIC_TURNSTILE_ENABLED  | false/true                       | yes      |
| NEXT_PUBLIC_TURNSTILE_SITE_KEY | _your site key_                  |
| TURNSTILE_SECRET_KEY           | _your secret key_                |
| WELCOME_EMAIL_ENABLED          | false/true                       | yes      |
| WELCOME_EMAIL_ADDRESS          | _welcome sender address_         |
| WELCOME_EMAIL_CONTENT_URL      | _your domain_/welcome-email.html |

If you don't have custom domain, use _project-name_.pages.dev as a base URL. You can see the domain in the project build setup under the _Project name_ field.

**7. Configure project functions**

Open your newly created project, go to _Settings_ tab and open _Functions_. Select compatibility date to **2022-11-30** and compatibility flags to **nodejs_compat**. Do this for both production and preview environments.

You can find more information about deployment to Cloudflare Pages [here](https://developers.cloudflare.com/pages/framework-guides/deploy-a-nextjs-site/#3-deploy-your-application-to-cloudflare-pages).

**8. Bind D1 database**

In _Settings > Functions_, find _D1 database bindings_, open _Edit bindings_ and create binding with the following settings:

| Name | D1 database          |
| ---- | -------------------- |
| DB   | _your database name_ |

Do this for both production and preview environments.

**9. Set up custom domain (optional)**

Open _Custom domains_ tab, select your custom domain and follow the instructions.

**10. Redeploy project**

Go to _Deployments_ tab, find the latest production deployment and click on _Retry deployment_. After deployment is finished, your waitlist site should be up and running.

## Local development

Some features such as welcome email and Turnstile will not work in local development environment.

**Install dependencies**

```bash
$ npm install
```

**Configure local environment variables**

Create .env file in the project root directory and fill in the necessary environment variables. Use .env.example as a template.

```bash
$ cp .env.example .env
```

**Run setup migration**

```bash
$ npm run migrate
```

**Export project**

You can also use **export:watch** to run the command in watch mode.

```bash
$ npm run export
```

**Start dev server**

```bash
$ npm run start
```

## License

[MIT](LICENSE.md)
