let DOMAIN = 'http://tanshio.dev'

if (process.env.NODE_ENV === 'production') {
  DOMAIN = ''
}

export default {
  POSTS: `${DOMAIN}/wp-json/wp/v2/posts?_embed`,
  POSTS_CATEGORY: `${DOMAIN}/wp-json/slug/v1/cat/`,
  POSTS_TAG: `${DOMAIN}/wp-json/slug/v1/tag/`,
  CATEGORIES: `${DOMAIN}/wp-json/wp/v2/categories`,
  TAGS: `${DOMAIN}/wp-json/wp/v2/tags`,
}
