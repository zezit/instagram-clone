import { createClient } from '@supabase/supabase-js'

const supabaseUrl: string = 'https://djgjxxrclvawttbvoram.supabase.co'
const supabaseKey: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqZ2p4eHJjbHZhd3R0YnZvcmFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI2MzU5MTksImV4cCI6MTk5ODIxMTkxOX0.fFMk_r77nhW02hj0LTQ6c2mhKG2Psa09e5PjfhCofJc'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase