import { NextRequest, NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const authenticated = await getAdminSession()
    return NextResponse.json({ authenticated })
  } catch (error) {
    console.error('Session check error:', error)
    return NextResponse.json({ authenticated: false }, { status: 500 })
  }
}

