import { NextRequest, NextResponse } from 'next/server'
import { verifyAdmin } from '@/lib/auth'
import { getAppSettings, updateAppSettings } from '@/lib/app-settings'

export async function GET(request: NextRequest) {
  try {
    const isAdmin = await verifyAdmin(request)
    if (!isAdmin) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }

    const settings = await getAppSettings()
    return NextResponse.json({ success: true, settings })
  } catch (error) {
    console.error('GET /admin/settings error:', error)
    return NextResponse.json({ success: false, message: 'Failed to fetch settings' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const isAdmin = await verifyAdmin(request)
    if (!isAdmin) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const updated = await updateAppSettings({
      companyName: body.companyName ?? null,
      contactEmail: body.contactEmail ?? null,
      contactPhone: body.contactPhone ?? null,
      heroVideoUrl: body.heroVideoUrl ?? null,
      heroPosterUrl: body.heroPosterUrl ?? null,
    })

    return NextResponse.json({ success: true, settings: updated })
  } catch (error) {
    console.error('PUT /admin/settings error:', error)
    return NextResponse.json({ success: false, message: 'Failed to update settings' }, { status: 500 })
  }
}


