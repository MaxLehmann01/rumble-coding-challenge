export type tImageOG = {
  id: number,
  media_details: {
    sizes: {
      thumbnail: {
        height: number,
        width: number,
        source_url: string
      },
      full: {
        height: number,
        width: number,
        source_url: string
      }
    }
  },
  alt_text: string
}