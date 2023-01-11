"use client"

import { Grid } from '@mantine/core'
import { Card } from 'ui/components/Card'

import { Concert } from '../app/(concerts)/page'

type PageProps = {
  concerts: Concert[]
}

export default function ConcertsGrid({ concerts }: PageProps) {
  return (
    <Grid gutter="md">
      {/* <LoadingOverlay visible={isLoading} /> */}

      {concerts?.map((concert) => (
         <Grid.Col span={3} key={concert.id}>
           <Card title={concert.title} category={concert.genres.name} content={concert.description} />
         </Grid.Col>
       ))}
    </Grid>
  )
}