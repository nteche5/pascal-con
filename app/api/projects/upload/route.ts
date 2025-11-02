import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { existsSync, mkdirSync } from 'fs'
import { verifyAdmin } from '@/lib/auth'

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

    // Handle file uploads
    const files = formData.getAll('files') as File[]
    const uploadedFiles: string[] = []

    if (files.length > 0) {
      // Create uploads directory if it doesn't exist
      const uploadsDir = join(process.cwd(), 'public', 'uploads', 'projects')
      if (!existsSync(uploadsDir)) {
        mkdirSync(uploadsDir, { recursive: true })
      }

      // Process each file
      for (const file of files) {
        if (file.size > 0) {
          const bytes = await file.arrayBuffer()
          const buffer = Buffer.from(bytes)
          
          // Generate unique filename
          const timestamp = Date.now()
          const sanitizedTitle = title.replace(/[^a-z0-9]/gi, '_').toLowerCase()
          const fileExtension = file.name.split('.').pop()
          const filename = `${sanitizedTitle}_${timestamp}.${fileExtension}`
          const filepath = join(uploadsDir, filename)

          // Write file to disk
          await writeFile(filepath, buffer)
          
          // Store relative path for frontend access
          uploadedFiles.push(`/uploads/projects/${filename}`)
        }
      }
    }

    // Here you would typically save the project data to a database
    // For now, we'll just return success with the uploaded file paths
    const projectData = {
      title,
      category,
      description,
      location: location || null,
      year: year || null,
      size: size || null,
      status: status || null,
      fullDescription: fullDescription || null,
      files: uploadedFiles,
      submittedAt: new Date().toISOString()
    }

    // TODO: Save to database
    console.log('Project submitted:', projectData)

    return NextResponse.json({
      success: true,
      message: 'Project uploaded successfully!',
      data: {
        project: projectData,
        filesUploaded: uploadedFiles.length
      }
    })
  } catch (error) {
    console.error('Error uploading project:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to upload project. Please try again later.' },
      { status: 500 }
    )
  }
}

