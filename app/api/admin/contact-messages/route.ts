import { NextRequest, NextResponse } from 'next/server'
import { verifyAdmin } from '@/lib/auth'
import { getContactMessages } from '@/lib/contact-messages'

export async function GET(request: NextRequest) {
  try {
    const isAdmin = await verifyAdmin(request)
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized. Admin access required.' },
        { status: 401 }
      )
    }

    const messages = await getContactMessages()

    return NextResponse.json({
      success: true,
      messages,
    })
  } catch (error) {
    console.error('Error fetching contact messages:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}

