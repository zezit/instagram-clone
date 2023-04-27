import { createClient } from '@supabase/supabase-js'

const supabaseUrl: string = 'https://djgjxxrclvawttbvoram.supabase.co'
const supabaseKey: string = 'UnpW6RCYnmhngy'

export const supabase = createClient(supabaseUrl, supabaseKey)