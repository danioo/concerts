import { supabaseServerClient } from '../utils/supabase-server'

import Hero from "../components/Hero";

export const metadata = {
  title: 'Concerts'
}

async function getData() {
  const concertsCount = await supabaseServerClient().from("concerts").select("*", {
    count: 'exact',
    head: true
  })
  const placesCount = await supabaseServerClient().from("places").select("*", {
    count: 'exact',
    head: true
  })
  const usersCount = await supabaseServerClient().from("profiles").select("*", {
    count: 'exact',
    head: true
  })

  return {
    concertsCount,
    placesCount,
    usersCount
  }
}

export default async function MainPage() {
  const { concertsCount, placesCount, usersCount } = await getData()

  return (
    <Hero concertsCount={concertsCount.count || 0} placesCount={placesCount.count || 0} usersCount={usersCount.count || 0} />
  );
}