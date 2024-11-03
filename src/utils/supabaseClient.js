import { createClient } from '@supabase/supabase-js';

// Deine Supabase URL und API-Key
const supabaseUrl = 'anwzvgwokuwgraytutsa.supabase.co';  // Ersetze dies mit deiner Supabase URL
const supabaseKey = 'process.env.SUPABASE_KEY';  // Ersetze dies mit deinem API-Schlüssel

// Erstelle den Supabase-Client
const supabase = createClient(supabaseUrl, supabaseKey);

// Exportiere den Supabase-Client
export default supabase;

