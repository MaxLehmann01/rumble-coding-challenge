import { tAuthor } from "./tAuthor"
import { tCategory } from "./tCategory"
import { tImage } from "./tImage"

export type tPost = {
  id: number,
  title: string,
  url: string,
  author: tAuthor,
  categories: tCategory[],
  image: tImage | null,
  timestamp: string
}