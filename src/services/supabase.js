import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://euvvlkzgtgrdcwhggoza.supabase.co'

// use a PUBLISHABLE KEY aqui 👇
const supabaseKey = 'sb_publishable_xbr-3uddSqC2QBIsR9wQUA_h5DIWXRG'

export const supabase = createClient(supabaseUrl, supabaseKey)