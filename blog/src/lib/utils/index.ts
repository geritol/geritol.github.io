import { base } from '$app/paths';

export const fetchMarkdownPosts = async () => {
    const allPostFiles = import.meta.glob('/src/routes/posts/**/+*.md');
    const iterablePostFiles = Object.entries(allPostFiles);

    const allPosts = await Promise.all(
        iterablePostFiles.map(async ([path, resolver]) => {
            const { metadata } = await resolver();
            const postPath = `${base}${path.slice(11, -9)}`;

            return {
                meta: metadata,
                path: postPath
            };
        })
    );

    return allPosts;
};