import 'server-only'

import { supabaseBrowserClient } from '../../../utils/supabase-browser'

import Filters from '../../../components/Filters'
import ConcertsTable from '../../../components/ConcertsTable'

export type Genre = {
  id: string,
  name: string
}

export type Place = {
  id: string,
  name: string
}

async function getGenres() {
  const { data: genres } = await supabaseBrowserClient.from("genres").select("*")

  return genres
}

async function getPlaces() {
  const { data: places } = await supabaseBrowserClient.from("places").select("*")

  return places
}

export default async function ConcertsTablePage() {
  const [ genres, places ] = await Promise.all([getGenres(), getPlaces()])

  return (
    <>
      <Filters genres={genres as Genre[]} places={places as Place[]} />

      <ConcertsTable />
    </>
  )
}