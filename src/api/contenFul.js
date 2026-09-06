import { createClient } from "contentful";

// ---------------------------------------------------------------------------
// Contentful client — single source of truth for all CMS communication.
// No component or hook should import `contentful` SDK directly.
// ---------------------------------------------------------------------------
const client = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
  environment: import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || "master",
});

/**
 * Fetch all published blog posts, newest first.
 */
export const getAllPosts = async () => {
  const res = await client.getEntries({
    content_type: "bahadarBlogs",
    order: "-fields.publishDate",
    include: 2,
  });
  return res.items;
};

/**
 * Fetch the newest post for the Home hero.
 */
export const getFeaturedPost = async () => {
  const res = await client.getEntries({
    content_type: "bahadarBlogs",
    order: "-fields.publishDate",
    include: 2,
    limit: 1,
  });
  return res.items[0] || null;
};

/**
 * Fetch a single post by its slug. include:2 resolves the author,
 * category, and any embedded entries/assets inside the rich text body.
 */
export const getPostBySlug = async (slug) => {
  const res = await client.getEntries({
    content_type: "bahadarBlogs",
    "fields.slug": slug,
    include: 2,
    limit: 1,
  });
  return res.items[0] || null;
};

/**
 * Fetch all posts whose category text matches a category slug.
 */
export const getPostsByCategorySlug = async (categorySlug) => {
  const category = await getCategoryBySlug(categorySlug);
  if (!category) return [];

  const res = await client.getEntries({
    content_type: "bahadarBlogs",
    "fields.categories[match]": category.fields.title,
    order: "-fields.publishDate",
    include: 2,
  });
  return res.items;
};

/**
 * Fetch related posts — same category, excluding the current post.
 */
export const getRelatedPosts = async (category, excludeSlug, limitCount = 3) => {
  if (!category) return [];
  const res = await client.getEntries({
    content_type: "bahadarBlogs",
    "fields.categories[match]": category,
    "fields.slug[ne]": excludeSlug,
    include: 2,
    limit: limitCount,
  });
  return res.items;
};

/**
 * Build category options from the blog category text field.
 */
export const getAllCategories = async () => {
  const posts = await getAllPosts();
  const names = [...new Set(posts.map((post) => post.fields.categories).filter(Boolean))];

  return names.sort().map((title) => ({
    sys: { id: title },
    fields: {
      title,
      slug: title.toLowerCase().trim().replace(/\s+/g, "-"),
    },
  }));
};

/**
 * Fetch a single category by slug (used on CategoryPage header).
 */
export const getCategoryBySlug = async (slug) => {
  const categories = await getAllCategories();
  return categories.find((category) => category.fields.slug === slug) || null;
};

/**
 * Full-text search across post titles.
 * Contentful's `query` param searches all text/symbol fields on the type.
 */
export const searchPosts = async (searchTerm) => {
  if (!searchTerm) return getAllPosts();
  const res = await client.getEntries({
    content_type: "bahadarBlogs",
    "fields.title[match]": searchTerm,
    order: "-fields.publishDate",
    include: 2,
  });
  return res.items;
};

/**
 * Combined search + category filter — used by BlogListing page.
 * Both params are optional; Contentful ignores falsy filters gracefully
 * because we only attach them conditionally below.
 */
export const getFilteredPosts = async ({ searchTerm, categorySlug } = {}) => {
  const query = {
    content_type: "bahadarBlogs",
    order: "-fields.publishDate",
    include: 2,
  };

  if (searchTerm) {
    query["fields.title[match]"] = searchTerm;
  }
  if (categorySlug) {
    const category = await getCategoryBySlug(categorySlug);
    if (category) {
      query["fields.Categories[match]"] = category.fields.title;
    }
  }

  const res = await client.getEntries(query);
  return res.items;
};

/**
 * Fetch all authors (rarely needed directly, but useful for an Authors page
 * or admin-style listing if you extend the project).
 */
export const getAllAuthors = async () => {
  const res = await client.getEntries({ content_type: "author" });
  return res.items;
};
