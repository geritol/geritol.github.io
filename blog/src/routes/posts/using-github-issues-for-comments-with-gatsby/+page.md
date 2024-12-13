---
title: Using Github Issues for Comments with Gatsby
date: "2020-09-02T22:40:32.169Z"
description: An easy way to add comments to your static site using Github Issues
issue: 2
---

So you have an awesome statically generated blog that requires no dinamic hosting.
Awesome!

Now you want to add comments to your blog posts. Doom. That's some dynamic content. You will need to deal with user autentication, storing data and offering an API to retrieve the comments. This is a quite complex task.

We could use some external services like _Disqus_, but this goes against the static site mentality, adds tracking and ads to our site.

Luckily there is a service that offers the above features and a nice GraphQL API, so if your blog is mainly intended for developers, you can use **Github Issues** for comments. Credits for [Paul Knopf](https://pknopf.com/post/2018-10-13-comments-for-static-sites-using-github-issues/) for the original idea.

# Let's do this

So the concept is that we will assign a Github issue for each of our posts. We will instruct Gatsby to fetch issue comments for the posts based on the issue's id. Our readers can head to that issue and add comments to it. Our static site host will receive a webhook notification when a new comment is posted and rebuild our site.

If you want a TLDR on how to do it, checkout the [commit](https://github.com/geritol/blog.geritol.tech/commit/0d3f8d9dce7b7059407e895150be7ddcbc99c6ef) in which I enabled comments for this site.

## Adding the plugin

To be able to fetch information from Github's API via GraphQL, we need to register a plugin.
This requires us to install `gatsby-source-graphql` as a dependency.

```javascript
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: `GitHub`,
        fieldName: `github`,
        url: `https://api.github.com/graphql`,
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_API_KEY}`,
        },
      },
    },
  ],
}
```

## Writing the query

In your template you will need to extend your GraphQL page query with the following:

```javascript
// src/templates/blog-post-with-comment.js
//...
export const pageQuery = graphql`
  query BlogPostWithComment($slug: String!, $issueId: Int!) {
    github {
      repository(name: "blog.geritol.tech", owner: "geritol") {
        issue(number: $issueId) {
          id
          comments(first: 30) {
            nodes {
              id
              author {
                login
                url
                avatarUrl
              }
              bodyHTML
              createdAt
              reactionGroups {
                content
              }
            }
          }
        }
      }
    }
  }
`
```

This will tell Gatsby to fetch the first 30 comments for a post based on its `issueId`.  
Do not forget to replace `repository(name: "blog.geritol.tech", owner: "geritol")` with your repository info.

## Gluing it together

Somewhere where you are calling `createPage` we will need to pass the issueId to it so our query can execute properly.

```javascript
createPage({
  path: post.node.fields.slug,
  component: blogPostWithComment,
  context: {
    slug: post.node.fields.slug,
    issueId: post.node.frontmatter.issue,
    previous,
    next,
  },
})
```

This allows us to provide our issue id in the frontmatter of our blogposts eg.:

```markdown
---
title: My awesome post
issue: 1
---
```

## Wrapping it up

Alright. Now we have comment information fetched for our post. We just need to display it.

This is not in the scope of this post, but if you want to get some inspiration, check out how I did it [here](https://github.com/geritol/blog.geritol.tech/commit/0d3f8d9dce7b7059407e895150be7ddcbc99c6ef).

To have your site re-generated when somebody comments on Github, you can use Github webhooks to launch a rebuild on your site when a new comment arrives. I use [Netlify](https://www.netlify.com/) which nicely supports this.

## Possible areas for improvement

- Also display reaction for comments and for the issue (the post itself)
- Distribute this as a standalone gatsby plugin (not sure if this is possible or not)
- Improve on the comment styling (maybe [utterances](https://github.com/utterance) is a good resource for this)
