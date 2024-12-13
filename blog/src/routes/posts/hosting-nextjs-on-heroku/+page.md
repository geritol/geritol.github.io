---
title: Hosting a production Next.js app on Heroku
date: "2021-04-17T09:15:00.169Z"
description: Heroku and Next.js are pretty awesome, but they do not play the best together when it comes to hosting a site in production that uses Static Generation and Incremental Static Regeneration
issue: 8
---

Heroku and Next.js are pretty awesome, but they do not play the best together when it comes to hosting a site in production that uses Static Generation and Incremental Static Regeneration. Let's try to collect what needs to be done to be able to host a production Next.js site on Heroku.

TLDR:

- don't use heroku pipelines
- configure automatic, daily deploys
- add nginx for ssl redirect and compression

## Don't use Heroku pipelines

In most cases when you build a Next.js app, it needs database access and generates static pages based on it in build time. Static Generation is a pretty awesome feature in Next.js as it means your database will get less hits as visitors come to your site, as they are served static content in form of `html` and `json` files. If you have statically generated pages from the database (usually you will want to use [Incremental Static Regeneration](https://nextjs.org/docs/basic-features/data-fetching#incremental-static-regeneration)) it means your build is stateful, hence you cannot use on of build pipelines in Heroku.

Using Heroku pipelines with a Next.js app that has stateful build would mean that a production release would bring along staging content to production with the code.

## Configure automatic, daily deploys

Using Incremental Static Regeneration also interferes with Heroku's [daily application restart](https://devcenter.heroku.com/articles/dynos#restarting). With Incremental Static Regeneration you can refresh your pages periodically without the need of rebuilding your whole project.

The daily restart "kills" that feature, since it resets the pages to the state they where in when your last build was run.

> If your Next.js app was built a year ago, your site will be reset daily to the state it was in a year ago.

That is pretty lame. If you use low refresh values only a few visitors would see outdated content, but you probably don't want that.

This can be prevented by using Server Side Rendering, but usually you do not want that since static pages are way petter performance wise.

To solve this issue you can trigger a build daily, this prevents Heroku from restarting your Dynos, but even if it would, your app will be in an up to date state after the restart.

A simple option to implement this is to have a `production` branch, and setup Heroku to automatically deploy from there. You can then create a job eg. in GitHub Actions or Heroku scheduler that runs daily, amends to the last commit and force pushes it to `production`.

Eg.:

```bash
git config --global user.email "bot@example.com"
git config --global user.name "Deploy Bot"
git commit --amend -C HEAD
git push -f
```

## Add NGINX for SSL redirect and compression

In most cases you will want to redirect traffic from HTTP to HTTPS. You can use the X-Forwarded-Proto (XFP) header for identifying the protocol (HTTP or HTTPS) and redirect based on that in your app. To do that in Next.js you would need to use a [Custom Server](https://nextjs.org/docs/advanced-features/custom-server) which you probably do not want to do as you would need to rewrite your app and loose some Next.js features.

Luckily we can setup a proxy to do that for us.
This involves more code, so I have setup a repo to [showcase how to setup NGINX on Heroku with our Next.js app](https://github.com/geritol/nextjs-nginx-heroku).

Using the proxy comes with some additional benefits. As the [Next.js docs](https://nextjs.org/docs/api-reference/next.config.js/compression) point out:

> Next.js provides gzip compression to compress rendered content and static files. In general you will want to enable compression on a HTTP proxy like nginx, to offload load from the Node.js process.

The proxy can also handle that, so compression on the Next.js side can be switched off.

## Other, non Next.js specific TODOs:

- [configure database backups](https://devcenter.heroku.com/articles/heroku-postgres-backups)
- [setup a logging addon](https://devcenter.heroku.com/articles/logging#log-history-limits)
- stress test depending on your application type
- setup a CDN if needed
- [setup autoscaling](https://devcenter.heroku.com/articles/scaling#understanding-concurrency) if needed

## Is it worth it after all?

Probably in most cases you will be better off hosting your Next.js app on [Vercel](https://vercel.com/). It is made by the same team who develops Next.js and they offer production-grade hosting for Next.js websites with zero configuration.

On the technical side of things they also have better offering. To name a few they provide HTTP/2 which Heroku does not support..., and an Edge Network. Also you don't need to worry about scaling your app.

To sum it up in most cases I would choose Vercel over Heroku to host production Next.js apps.
