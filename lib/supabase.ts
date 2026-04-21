import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bstjmkahfqwrtukyvixo.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzdGpta2FoZnF3cnR1a3l2aXhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2MDI0MjAsImV4cCI6MjA5MjE3ODQyMH0.ER9o37OaJb6jn0EggFmmpGVEt7PEW59WewV3eeq5xNc";

export const supabase = createClient(supabaseUrl, supabaseKey);