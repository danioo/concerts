import { request } from 'graphql-request'

export const fetcher = query => request('https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/claqln1i769sq01td5u7mhl5n/master', query)