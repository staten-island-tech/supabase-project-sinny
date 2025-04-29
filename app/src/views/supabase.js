import { createClient } from "@supabase/supabase-js"
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1cmtqbHpkbHN2Y29kaG1qYmRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4NjExNzksImV4cCI6MjA2MTQzNzE3OX0.t9_E8FkuC00Q1u4zSLCYwi4I_0AInvrilpnA1FQ9wnA"
const supabaseUrl = "https://durkjlzdlsvcodhmjbdq.supabase.co"
export const supabase = createClient(supabaseKey, supabaseUrl)
