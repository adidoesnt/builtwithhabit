import { env } from '$env/dynamic/private';
import { createClient } from '@supabase/supabase-js';

const { SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY } = env;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !SUPABASE_SERVICE_ROLE_KEY) {
	throw new Error('SUPABASE_URL, SUPABASE_ANON_KEY and SUPABASE_SERVICE_ROLE_KEY must be set');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const {
	auth: { admin: supabaseAdmin }
} = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

export { supabaseAdmin };
