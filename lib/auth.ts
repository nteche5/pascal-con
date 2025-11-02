import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

// Admin credentials - In production, use environment variables and hash passwords
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@pksa.com'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

export async function verifyAdmin(request: NextRequest): Promise<boolean> {
  const sessionToken = request.cookies.get('admin_session')?.value
  
  if (!sessionToken) {
    return false
  }

  // Simple session verification - In production, use JWT or database session storage
  // For now, we'll just check if the session cookie exists and matches expected format
  return sessionToken === 'admin_authenticated'
}

export async function getAdminSession(): Promise<boolean> {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get('admin_session')?.value
  return sessionToken === 'admin_authenticated'
}

export function createAdminSession() {
  return 'admin_authenticated'
}

export function validateCredentials(email: string, password: string): boolean {
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return false
  }
  
  return email.toLowerCase() === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASSWORD
}

