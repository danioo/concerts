import ConcertsGrid from '../../components/ConcertsGrid'
import Filters from '../../components/Filters'

export const metadata = {
  title: 'Concerts'
}

export default function ConcertsGridPage() {
  return (
    <>
      <Filters />

      <ConcertsGrid />
    </>
  )
}