import { NextRequest, NextResponse } from 'next/server'
import { verifyAdmin } from '@/lib/auth'
import { getSupabaseAdminClient } from '@/lib/supabase-admin'
import { ProjectSubmissionFile, saveProjectSubmission } from '@/lib/project-submissions'

const DEFAULT_BUCKET = 'project-files'

export async function POST(request: NextRequest) {
  try {
    // Check if user is admin
    const isAdmin = await verifyAdmin(request)
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized. Admin access required.' },
        { status: 401 }
      )
    }

    const formData = await request.formData()

    // Extract form fields
    const title = formData.get('title') as string
    const category = formData.get('category') as string
    const description = formData.get('description') as string
    const location = formData.get('location') as string
    const year = formData.get('year') as string
    const size = formData.get('size') as string
    const status = formData.get('status') as string
    const fullDescription = formData.get('fullDescription') as string

    // Validate required fields
    if (!title || !category || !description) {
      return NextResponse.json(
        { success: false, message: 'Please fill in all required fields (Title, Category, Description)' },
        { status: 400 }
      )
    }

    const files = formData.getAll('files') as File[]

    const supabase = getSupabaseAdminClient()
    const bucket = process.env.SUPABASE_PROJECTS_BUCKET || DEFAULT_BUCKET

    const uploadedFiles: ProjectSubmissionFile[] = []

    for (const [index, file] of files.entries()) {
      if (!file || file.size === 0) {
        continue
      }

      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      const extension = file.name.includes('.') ? `.${file.name.split('.').pop()!.toLowerCase()}` : ''
      const baseName = file.name.replace(/\.[^/.]+$/, '')
      const sanitizedBase = baseName.replace(/[^a-z0-9_-]/gi, '_').toLowerCase()
      const timestamp = Date.now()
      const uniquePath = `projects/${timestamp}-${index}-${sanitizedBase}${extension}`

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(uniquePath, buffer, {
          contentType: file.type || 'application/octet-stream',
          upsert: false,
        })

      if (uploadError) {
        console.error('Error uploading file to Supabase storage:', uploadError)
        throw new Error('Failed to upload project file')
      }

      const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(uniquePath)

      uploadedFiles.push({
        name: file.name,
        path: uniquePath,
        url: publicUrlData?.publicUrl ?? null,
        type: file.type || null,
        size: file.size,
      })
    }

    const projectRecord = await saveProjectSubmission({
      title,
      category,
      description,
      location: location || null,
      year: year || null,
      size: size || null,
      status: status || null,
      fullDescription: fullDescription || null,
      files: uploadedFiles,
    })

    return NextResponse.json({
      success: true,
      message: 'Project uploaded successfully!',
      data: projectRecord,
    })
  } catch (error) {
    console.error('Error uploading project:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to upload project. Please try again later.' },
      { status: 500 }
    )
  }
}

