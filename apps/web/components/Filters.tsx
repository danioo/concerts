"use client"

import { Box, Group, Select } from '@mantine/core'

import { useFilters } from '../utils/filters'
import { Genre, Place } from '../app/(concerts)/page'

type PageProps = {
  genres: Genre[],
  places: Place[]
}

export default function Filters({ genres, places }: PageProps) {
  const { filters, setFilters } = useFilters()

  return (
    <Box p='md'>
      Filters
      <Group>
        <Select label="Genre" placeholder='All genres' clearable data={genres?.map(genre => ({value: genre.id, label: genre.name})) ?? []} onChange={value => setFilters('genre', value)} value={filters.genre} />
        <Select label="Place" placeholder='All places' clearable data={places?.map(place => ({value: place.id, label: place.name})) ?? []} onChange={value => setFilters('place', value)} value={filters.place} />
      </Group>
    </Box>
  )
}