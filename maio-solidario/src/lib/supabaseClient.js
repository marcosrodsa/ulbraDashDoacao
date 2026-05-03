import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://supabase.ulbrads.site'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNzQxODEwMDAwLCJleHAiOjIwNTczODYwMDB9.RLSOgVmkd2LeLpWHYSXzwCG6wEp7l4J44qONffvYko8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
