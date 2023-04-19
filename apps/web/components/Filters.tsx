"use client"

import { Box, Group, Select } from '@mantine/core'
import useSWR from 'swr'

import { useFilters } from '../utils/filters'
import { fetcher } from '../utils/fetcher'
import PlacesQuery from '../queries/places.graphql'
import GenresQuery from '../queries/genres.graphql'
import { GetPlacesQuery, GetGenresQuery } from '../types/graphql'

export default function Filters() {
  const { filters, setFilters } = useFilters()
  const { data: placesData, error: placesError } = useSWR(PlacesQuery, fetcher);
  const { data: genresData, error: genresError } = useSWR(GenresQuery, fetcher);

  const places = (placesData as GetPlacesQuery)?.placesCollection?.edges
  const genres = (genresData as GetGenresQuery)?.genresCollection?.edges

  return (
    <Box p='md'>
      Filters
      <Group>
        <Select label="Genre" placeholder='All genres' clearable data={genres?.map(genre => ({value: genre.node.id.toString(), label: genre.node.name})) ?? []} onChange={value => setFilters('genre', value)} value={filters.genre} />
        <Select label="Place" placeholder='All places' clearable data={places?.map(place => ({value: place.node.id.toString(), label: place.node.name})) ?? []} onChange={value => setFilters('place', value)} value={filters.place} />
        <Select label="Tickets available" placeholder="All availabilities" clearable data={[true, false].map(available => ({value: available ? "true" : "false", label: available ? "Available" : "Not available"}))} onChange={value => setFilters('ticketsAvailable', value)} value={filters.ticketsAvailable} />
      </Group>
    </Box>
  )
}