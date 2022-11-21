"use client"

import { gql } from 'graphql-request'
import useSWR from 'swr'
import { Grid } from '@mantine/core';

import { fetcher } from '../libs/fetcher'
import ConcertCard from '../components/ConcertCard'

const CONCERTS_QUERY = gql`
  query Concerts {
    concerts {
      id
      title
      description {
        text
      }
    }
  }
`

export default function Page() {
  const { data, error } = useSWR(CONCERTS_QUERY, fetcher)

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <Grid gutter="md">
      {data?.concerts?.map((concert: { id: string, title: string, description: { text: string } }) => (
        <Grid.Col span={3} key={concert.id}>
          <ConcertCard title={concert.title} description={concert.description.text} />
        </Grid.Col>
      ))}
    </Grid>
  );
}