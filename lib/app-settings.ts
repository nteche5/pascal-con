import { getSupabaseAdminClient } from './supabase-admin'

export type AppSettings = {
  companyName?: string | null
  contactEmail?: string | null
  contactPhone?: string | null
  heroVideoUrl?: string | null
  heroPosterUrl?: string | null
}

const SETTINGS_KEY = 'default'

export async function getAppSettings(): Promise<AppSettings> {
  const supabase = getSupabaseAdminClient()
  const { data, error } = await supabase
    .from('app_settings')
    .select('*')
    .eq('key', SETTINGS_KEY)
    .maybeSingle()

  if (error) {
    console.error('Error fetching app settings:', error)
    throw new Error('Failed to fetch settings')
  }

  if (!data) return {}

  return {
    companyName: data.company_name ?? null,
    contactEmail: data.contact_email ?? null,
    contactPhone: data.contact_phone ?? null,
    heroVideoUrl: data.hero_video_url ?? null,
    heroPosterUrl: data.hero_poster_url ?? null,
  }
}

export async function updateAppSettings(input: AppSettings): Promise<AppSettings> {
  const supabase = getSupabaseAdminClient()
  const payload = {
    key: SETTINGS_KEY,
    company_name: input.companyName ?? null,
    contact_email: input.contactEmail ?? null,
    contact_phone: input.contactPhone ?? null,
    hero_video_url: input.heroVideoUrl ?? null,
    hero_poster_url: input.heroPosterUrl ?? null,
  }

  const { data, error } = await supabase
    .from('app_settings')
    .upsert(payload, { onConflict: 'key' })
    .select()
    .single()

  if (error) {
    console.error('Error updating app settings:', error)
    throw new Error('Failed to update settings')
  }

  return {
    companyName: data.company_name ?? null,
    contactEmail: data.contact_email ?? null,
    contactPhone: data.contact_phone ?? null,
    heroVideoUrl: data.hero_video_url ?? null,
    heroPosterUrl: data.hero_poster_url ?? null,
  }
}


