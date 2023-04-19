"use client"

import useSWR from 'swr'
import { Grid } from '@mantine/core'

import { Card } from 'ui/components/Card'
import { useFilters } from '../utils/filters'
import { fetcher } from '../utils/fetcher'
import ConcertsQuery from '../queries/concerts.graphql'
import { GetConcertsQuery, ConcertsFilter } from '../types/graphql'

export default function ConcertsGrid() {
  const { filters } = useFilters()
  const variables = {
    genre_id: {
      eq: null
    },
    place_id: {
      eq: null
    },
    on_sale: {
      eq: null
    }
  } as ConcertsFilter

  if (filters.genre !== null) {
    variables.genre_id = { eq: filters.genre }
  } else {
    delete variables.genre_id
  }

  if (filters.place !== null) {
    variables.place_id = { eq: filters.place }
  } else {
    delete variables.place_id
  }

  if (filters.ticketsAvailable !== null) {
    variables.on_sale = { eq: filters.ticketsAvailable === "true" ? true : false }
  } else {
    delete variables.on_sale
  }

  const { data, error } = useSWR([ConcertsQuery, variables.genre_id !== null || variables.place_id !== null || variables.on_sale !== null ? { filter: variables } : null], ([ query, variables ]) => fetcher(query, variables));

  const concerts = (data as GetConcertsQuery)?.concertsCollection?.edges

  return (
    <Grid gutter="md">
      {concerts?.map((concert) => (
         <Grid.Col span={3} key={concert.node.id}>
           <Card title={concert.node.title} category={concert.node.genres?.name || 'N/A'} content={concert.node.description} place={concert.node.places?.name || 'N/A'} date={concert.node.date} onSale={concert.node.on_sale || false} />
         </Grid.Col>
       ))}
    </Grid>
  )
}