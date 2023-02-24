"use client"

import useSWR from 'swr'
import { Grid } from '@mantine/core'

import { Card } from 'ui/components/Card'
import { useFilters } from '../utils/filters'
import { fetcher } from '../utils/fetcher'

export type Concert = {
  node: {
    id: string,
    title: string,
    description: string,
    date: Date,
    on_sale: boolean,
    genres: {
      name: string
    },
    places: {
      name: string
    }
  }
}
type Variables = {
  filter: {
    genre_id?: {
      eq?: Number | null
    },
    place_id?: {
      eq?: Number | null
    }
  }
}

export default function ConcertsGrid() {
  const { filters } = useFilters()
  const variables = {
    filter: {
      genre_id: {
        eq: null
      },
      place_id: {
        eq: null
      }
    }
  } as Variables

  if (filters.genre !== null) {
    variables.filter.genre_id = { eq: filters.genre }
  } else {
    delete variables.filter.genre_id
  }

  if (filters.place !== null) {
    variables.filter.place_id = { eq: filters.place }
  } else {
    delete variables.filter.place_id
  }

  const { data, error } = useSWR([`
    query GetConcerts($filter: concertsFilter!) {
      concertsCollection(filter: $filter) {
        edges {
          node {
            id
            title
            description
            date
            on_sale
            genres {
              name
            }
            places {
              name
            }
          }
        }
      }
    }
  `, variables.filter.genre_id !== null || variables.filter.place_id !== null ? variables : null], ([ query, variables ]) => fetcher(query, variables));

  const concerts = data?.concertsCollection?.edges as Concert[]

  return (
    <Grid gutter="md">
      {concerts?.map((concert) => (
         <Grid.Col span={3} key={concert.node.id}>
           <Card title={concert.node.title} category={concert.node.genres.name} content={concert.node.description} place={concert.node.places.name} date={concert.node.date} onSale={concert.node.on_sale} />
         </Grid.Col>
       ))}
    </Grid>
  )
}