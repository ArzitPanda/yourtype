
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://vibgjtjlevdtvqlbntlr.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpYmdqdGpsZXZkdHZxbGJudGxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1OTgxNTMsImV4cCI6MjA2OTE3NDE1M30.ToSLPMei6aWZjeCctegaUwAuI1a9lrCXAxW5cJTRnzs";
export  const supabase = createClient(supabaseUrl, supabaseKey)
