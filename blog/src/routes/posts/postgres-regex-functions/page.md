---
title: Postgres Regexp Functions
date: "2021-04-25T21:44:03.284Z"
description: In one of my recent projects I found great use of Postgres Regexp Functions. I did not know much about them until now, but they can come really handy when working with a legacy database.
issue: 9
---

In one of my recent projects I found great use of Postgres Regexp Functions. I did not know much about them until now, but they can come really handy when working with a legacy database. This note is about showing how these functions work through some real life examples.

## `substring`

Let's say the previous devs decided to store the full iframe code of Youtube Video Embeds. This can be problematic in many ways, and we only want to store the video ids in the future. The problem is that there are many records in the table, so going through them manually would not be ideal.

Luckily we can use the `substring` function in Postgres to to do the work for us.

```sql
-- https://www.db-fiddle.com/f/fpJibTF5bSdR1iwBZB9K8E/4
UPDATE
  entity
SET
  video_embed = substring(
    video_embed
    from
      '\/embed\/([^"]*)'
  );

```

Boom. We removed lots of duplicate data, and can use a common component or package to render those iframes!

## `regexp_replace`

The app uses `bcrypt` for hashing passwords. The legacy system uses a non standard `$2y$` prefix.

These are mostly compatible with the standard `$2b$` prefix, but we need to change each user's password hash to begin with the standard prefix. The `regexp_replace` function was just made to accomplish tasks like this one.

```sql
-- https://www.db-fiddle.com/f/9BA3wzcuQhdR5ytXAehzuW/0
UPDATE
  users
SET
  password = regexp_replace(
    password, '(^\$2y\$)(.*)', '$2b$\2'
  )

```

Note the use of `\2` this inserts the appropriate match group to the end result.

> The replacement string can contain \n, where n is 1 through 9, to indicate that the source substring matching the n'th parenthesized subexpression of the pattern should be inserted, and it can contain \& to indicate that the substring matching the entire pattern should be inserted.

## `regexp_match`

Say your database contains only the user's full name, but you want to store their first name and last name separately. We can use `regexp_match` to split the name to separate parts and assign it's result to separate columns.

```sql
-- https://www.db-fiddle.com/f/u7LYZEwwD8egQicGStMKX3/3
UPDATE
  users
SET
  first_name = (regexp_match) [1],
  last_name = (regexp_match) [3]
FROM
  (
    SELECT
      id,
      regexp_match(name, '([^\s]+)(\s(.*))?')
    FROM
      users
  ) AS split_name
WHERE
  users.id = split_name.id;
```

Note that this is a pretty simplistic approach to names. If the name consist of more than two parts, this setup put those extra name parts in the last name. You may want to adjust the regexp to your needs, and run through the table manually to make sure your data is correct after this transformation.

There are some other functions, namely `regexp_matches`, `regexp_split_to_table` and `regexp_split_to_array` which I did not find use of in the current project, refer to the [Postgres Function Matching Docs](https://www.postgresql.org/docs/13/functions-matching.html) for more on them.
