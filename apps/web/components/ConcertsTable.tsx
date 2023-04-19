"use client"

import useSWR from 'swr'
import { ScrollArea, Table } from '@mantine/core'

import { useFilters } from '../utils/filters'
import ConcertsQuery from '../queries/concerts.graphql'
import { fetcher } from '../utils/fetcher'
import {  ConcertsEdge, ConcertsFilter } from '../types/graphql'

export default function ConcertsTable() {
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

  const concerts = data?.concertsCollection?.edges as ConcertsEdge[]

  return (
    <ScrollArea>
      <Table verticalSpacing="md" striped highlightOnHover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Genre</th>
            <th>Date</th>
            <th>Place</th>
            <th>On sale</th>
          </tr>
        </thead>

        <tbody>
          {concerts?.map(concert => (
            <tr key={concert.node.id}>
              <td>{concert.node.title}</td>
              <td>{concert.node.description}</td>
              <td>{concert.node.genres?.name}</td>
              <td>{concert.node.date}</td>
              <td>{concert.node.places?.name}</td>
              <td>{concert.node.on_sale ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </ScrollArea>
  )
}