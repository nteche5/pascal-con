import { getSupabaseAdminClient } from './supabase-admin'

const TABLE_NAME = 'contact_messages'

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone?: string | null
  subject: string
  message: string
  submittedAt: string
}

type InsertContactMessage = Omit<ContactMessage, 'id' | 'submittedAt'>

export async function saveContactMessage(payload: InsertContactMessage): Promise<ContactMessage> {
  const supabase = getSupabaseAdminClient()

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert({
      name: payload.name,
      email: payload.email,
      phone: payload.phone ?? null,
      subject: payload.subject,
      message: payload.message,
    })
    .select()
    .single()

  if (error) {
    console.error('Error saving contact message:', error)
    throw new Error('Failed to store contact message')
  }

  return {
    id: data.id,
    name: data.name,
    email: data.email,
    phone: data.phone,
    subject: data.subject,
    message: data.message,
    submittedAt: data.created_at ?? new Date().toISOString(),
  }
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  const supabase = getSupabaseAdminClient()

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select()
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching contact messages:', error)
    throw new Error('Failed to fetch contact messages')
  }

  return (data ?? []).map((item) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    phone: item.phone,
    subject: item.subject,
    message: item.message,
    submittedAt: item.created_at ?? new Date().toISOString(),
  }))
}

export async function deleteContactMessage(id: string): Promise<boolean> {
  const supabase = getSupabaseAdminClient()

  const { error, count } = await supabase
    .from(TABLE_NAME)
    .delete({ count: 'exact' })
    .eq('id', id)

  if (error) {
    console.error('Error deleting contact message:', error)
    throw new Error('Failed to delete contact message')
  }

  return (count ?? 0) > 0
}


