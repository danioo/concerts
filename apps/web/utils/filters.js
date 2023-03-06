import { createContext, useContext, useEffect, useState } from 'react'

export const FiltersContext = createContext()

export const FiltersProvider = ({ ...props }) => {
  const [ filters, setFilters ] = useState({
    genre: null,
    place: null,
    ticketsAvailable: null
  })

  const updateFilters = (key, value) => setFilters(prevFilters => ({
    ...prevFilters,
    [key]: value
  }))

  return (
    <FiltersContext.Provider value={{
      filters, updateFilters
    }} {...props} />
  )
}

export const useFilters = () => {
  const context = useContext(FiltersContext)

  if (context === undefined) {
    throw new Error("useFilters must be used within FiltersProvider")
  }

  const { filters, updateFilters } = context

  return {
    filters,
    setFilters: updateFilters
  }
}