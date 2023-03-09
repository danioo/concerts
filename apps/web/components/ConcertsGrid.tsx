"use client"

import useSWR from 'swr'
import { Grid } from '@mantine/core'

import { Card } from 'ui/components/Card'
import { useFilters } from '../utils/filters'
import { fetcher } from '../utils/fetcher'
import { Concert, Variables } from '../types/data'
import ConcertsQuery from '../queries/concerts.graphql'

export default function ConcertsGrid() {
  const { filters } = useFilters()
  const variables = {
    filter: {
      genre_id: {
        eq: null
      },
      place_id: {
        eq: null
      },
      on_sale: {
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

  if (filters.ticketsAvailable !== null) {
    variables.filter.on_sale = { eq: filters.ticketsAvailable === "true" ? true : false }
  } else {
    delete variables.filter.on_sale
  }

  const { data, error } = useSWR([ConcertsQuery, variables.filter.genre_id !== null || variables.filter.place_id !== null || variables.filter.on_sale !== null ? variables : null], ([ query, variables ]) => fetcher(query, variables));

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