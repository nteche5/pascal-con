import { writeFile, readFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import { join } from 'path'

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  submittedAt: string
}

const CONTACT_MESSAGES_FILE = join(process.cwd(), 'data', 'contact-messages.json')

async function ensureDataDirectory() {
  const dataDir = join(process.cwd(), 'data')
  if (!existsSync(dataDir)) {
    await mkdir(dataDir, { recursive: true })
  }
}

async function readMessages(): Promise<ContactMessage[]> {
  try {
    await ensureDataDirectory()
    if (!existsSync(CONTACT_MESSAGES_FILE)) {
      return []
    }
    const content = await readFile(CONTACT_MESSAGES_FILE, 'utf-8')
    return JSON.parse(content)
  } catch (error) {
    console.error('Error reading messages:', error)
    return []
  }
}

async function writeMessages(messages: ContactMessage[]): Promise<void> {
  try {
    await ensureDataDirectory()
    await writeFile(CONTACT_MESSAGES_FILE, JSON.stringify(messages, null, 2), 'utf-8')
  } catch (error) {
    console.error('Error writing messages:', error)
    throw error
  }
}

export async function saveContactMessage(message: Omit<ContactMessage, 'id' | 'submittedAt'>): Promise<ContactMessage> {
  const messages = await readMessages()
  const newMessage: ContactMessage = {
    ...message,
    id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    submittedAt: new Date().toISOString()
  }
  
  messages.unshift(newMessage) // Add to beginning (newest first)
  await writeMessages(messages)
  
  return newMessage
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  return await readMessages()
}

export async function deleteContactMessage(id: string): Promise<boolean> {
  const messages = await readMessages()
  const filtered = messages.filter(msg => msg.id !== id)
  
  if (filtered.length === messages.length) {
    return false // Message not found
  }
  
  await writeMessages(filtered)
  return true
}


