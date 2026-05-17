import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://xdpqasmwsfylsskcuouh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkcHFhc213c2Z5bHNza2N1b3VoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4NDg1OTAsImV4cCI6MjA4NjQyNDU5MH0.j2qnDEkKn1i1Wl45NtIUgf9q2YePqaUH_TA3629KTZ4" 
);