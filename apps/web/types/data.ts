export type Concert = {
  node: {
    id: string,
    title: string,
    description: string,
    date: string,
    on_sale: boolean,
    genres: {
      name: string
    },
    places: {
      name: string
    }
  }
}

export type Variables = {
  filter: {
    genre_id?: {
      eq?: Number | null
    },
    place_id?: {
      eq?: Number | null
    },
    on_sale?: {
      eq?: boolean | null
    }
  }
}