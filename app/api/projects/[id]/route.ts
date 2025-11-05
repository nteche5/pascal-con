import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdminClient } from '@/lib/supabase-admin'
import { verifyAdmin } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Project ID is required' },
        { status: 400 }
      )
    }

    const supabase = getSupabaseAdminClient()

    const { data, error } = await supabase
      .from('project_submissions')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      return NextResponse.json(
        { success: false, message: 'Project not found' },
        { status: 404 }
      )
    }

    // Transform the data to match the expected format
    const project = {
      id: data.id,
      title: data.title,
      category: data.category,
      description: data.description,
      fullDescription: data.full_description || data.description,
      location: data.location || '',
      year: data.year || '',
      size: data.size || '',
      status: data.status || '',
      files: data.files || [],
      image: data.files && data.files.length > 0 && data.files[0]?.url 
        ? data.files[0].url 
        : '/placeholder-project.jpg',
      features: [] // Can be added later if needed
    }

    return NextResponse.json({
      success: true,
      project
    })
  } catch (error) {
    console.error('Error in project API:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if user is admin
    const isAdmin = await verifyAdmin(request)
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized. Admin access required.' },
        { status: 401 }
      )
    }

    const { id } = params

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Project ID is required' },
        { status: 400 }
      )
    }

    const supabase = getSupabaseAdminClient()

    // First, get the project to access its files
    const { data: project, error: fetchError } = await supabase
      .from('project_submissions')
      .select('*')
      .eq('id', id)
      .single()

    if (fetchError || !project) {
      return NextResponse.json(
        { success: false, message: 'Project not found' },
        { status: 404 }
      )
    }

    // Delete files from storage if they exist
    const bucket = process.env.SUPABASE_PROJECTS_BUCKET || 'project-files'
    const files = project.files || []
    
    if (Array.isArray(files) && files.length > 0) {
      for (const file of files) {
        if (file.path) {
          const { error: deleteError } = await supabase.storage
            .from(bucket)
            .remove([file.path])
          
          if (deleteError) {
            console.error('Error deleting file from storage:', deleteError)
            // Continue with database deletion even if file deletion fails
          }
        }
      }
    }

    // Delete the project from the database
    const { error: deleteError } = await supabase
      .from('project_submissions')
      .delete()
      .eq('id', id)

    if (deleteError) {
      console.error('Error deleting project:', deleteError)
      return NextResponse.json(
        { success: false, message: 'Failed to delete project' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Project deleted successfully'
    })
  } catch (error) {
    console.error('Error in delete project API:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

