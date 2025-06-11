import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://saccranbxbvgeslbadlq.supabase.co"
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhY2NyYW5ieGJ2Z2VzbGJhZGxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzMDc4NzYsImV4cCI6MjA1OTg4Mzg3Nn0.HzhTkRaFL4IgBU5Q--QXx8hbXh3FYyDDvu00nxR0row"

export const supabase = createClient(supabaseUrl, supabaseKey)
