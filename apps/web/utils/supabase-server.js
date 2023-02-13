import { headers, cookies } from 'next/headers'
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'

export const supabaseServerClient = () => createServerComponentSupabaseClient({headers, cookies})