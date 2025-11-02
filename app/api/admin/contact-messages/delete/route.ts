import { NextRequest, NextResponse } from 'next/server'
import { verifyAdmin } from '@/lib/auth'
import { deleteContactMessage } from '@/lib/contact-messages'

export async function DELETE(request: NextRequest) {
  try {
    const isAdmin = await verifyAdmin(request)
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized. Admin access required.' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { id } = body

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Message ID is required' },
        { status: 400 }
      )
    }

    const deleted = await deleteContactMessage(id)

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: 'Message not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Message deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting contact message:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to delete message' },
      { status: 500 }
    )
  }
}

