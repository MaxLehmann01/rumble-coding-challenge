export type tImage = {
  id: number,
  thumbnail: {
    height: number,
    width: number
    source_url: string,
  },
  full: {
    height: number,
    width: number
    source_url: string,
  },
  alt_text: string
}