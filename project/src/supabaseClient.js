import { createClient } from '@supabase/supabase-js';
//import dotenv from 'dotenv';

//dotenv.config();

export const supabase = createClient(
  "https://ponhcenaovkremckkfed.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvbmhjZW5hb3ZrcmVtY2trZmVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxNzU4MDUsImV4cCI6MjA2Mjc1MTgwNX0.yf1V-XId3dPSyMOI9PPg7iJ386X4-2eGR7FRmDJd_V4"
  //process.env.PROJECT_URL,
  //process.env.SUPABASE_API_KEY
);