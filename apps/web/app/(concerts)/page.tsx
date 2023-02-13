import 'server-only'

import { supabaseBrowserClient } from '../../utils/supabase-browser'

import ConcertsGrid from '../../components/ConcertsGrid'

export type Concert = {
  id: string,
  title: string,
  description: string,
  genres: {
    name: string
  }
}

export default async function HomePage() {
  const { data: concerts } = await supabaseBrowserClient.from("concerts").select("*, genres(*)")

  return (
    <ConcertsGrid concerts={concerts as Concert[]} />
  )
}