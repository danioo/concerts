import { GraphQLClient } from 'graphql-request'

const graphqlClient = new GraphQLClient(`https://jdjjodoknqyekyvtepga.supabase.co/graphql/v1`, {
  headers: {
    apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkampvZG9rbnF5ZWt5dnRlcGdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzE3ODAxMDgsImV4cCI6MTk4NzM1NjEwOH0.waFfPyhjtLuztd9ik2a-IP0jp5UFkLug9h_OqrRhcmc"
  }
})

export const fetcher = (query, variables) => graphqlClient.request(query, variables)