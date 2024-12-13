---
title: How To Setup A Simple Blog (like this one)
date: "2019-05-09T22:40:32.169Z"
description: Setting up a blog nowadays is quite easy. You do not have to mess with setting up a WordPress site or any other conventional blog engine that require databases and dynamic hosting. Create a static generated blog in 5 minutes.
issue: 1
---

Setting up a blog nowadays is quite easy. You do not have to mess with setting up
a WordPress site or any other conventional blog engine that require databases and
dynamic hosting.

Using some modern tools and prebuilt templates you can have your blog up for free
under ~5 minutes.

## The plan

- use [Gatsby](https://www.gatsbyjs.org/) to create the blog
- host our code on [Github](https://github.com/)
- build and make our blog available to the world using [Netlify](https://www.netlify.com/)

## Creating the blog

On Github, fork [gatsby-starter-blog](https://github.com/gatsbyjs/gatsby-starter-blog).
Personalize `siteMetadata` in `gatsby-config.js` (this file contains things like the blog's
title, description, author information, etc.).

Visit [https://app.netlify.com/start](https://app.netlify.com/start) and log in with your Github account.
Select the newly forked repository `gatsby-starter-blog` and click `Deploy site`. The site should start deploying,
and will be soon available under a custom `netlify.com` subdomain. If you make changes to the repository,
the site will be automatically re-built and deployed.

> That's it! Your blog is now ready and available on the interwebs.

Nice to have: if you have a domain name, you can easily add it under `Overview -> Site Settings -> Domain management -> Add domain alias`. After adding the domain to your Netlify site you will need to add a `DNS` record to point your domain to the Netlify site (netlify will provide you detailed instructions about this).

## Development process

Probably you will want a better editing experience than making the changes and wait Netlify to make your site available.

To do this you will need NodeJs and Gatsby installed on your local machine. If you are unfamiliar with NodeJs,
please follow [part zero](https://www.gatsbyjs.org/tutorial/part-zero/) of the Gatsby tutorial.

> If you already have NodeJs installed simply run `npm install -g gatsby-cli`

To run the develompment server run `gatsby develop` in the project folder. This will serve
your blog locally on `http://localhost:8000`. The development server will rebuild and refresh
the page content automatically after your files change, providing you a near instant feedback
on how your content or style changes look.
