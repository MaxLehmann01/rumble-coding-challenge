export type tPostFetched = {
  id: number,
  title: {
    rendered: string
  },
  date: string,
  author: number,
  categories: number[],
  featured_media: number,
  link: string
}