import { NextResponse } from 'next/server'
import { getSupabaseAdminClient } from '@/lib/supabase-admin'

export async function GET() {
  try {
    const supabase = getSupabaseAdminClient()

    const { data, error } = await supabase
      .from('project_submissions')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching projects:', error)
      return NextResponse.json(
        { success: false, message: 'Failed to fetch projects', error: error.message },
        { status: 500 }
      )
    }

    // Transform the data to match the expected format
    const projects = (data || []).map((project) => ({
      id: project.id,
      title: project.title,
      category: project.category,
      description: project.description,
      fullDescription: project.full_description || project.description,
      location: project.location || '',
      year: project.year || '',
      size: project.size || '',
      status: project.status || '',
      files: project.files || [],
      image: project.files && project.files.length > 0 && project.files[0]?.url 
        ? project.files[0].url 
        : '/placeholder-project.jpg',
      submittedAt: project.created_at || new Date().toISOString(),
      features: [] // Can be added later if needed
    }))

    return NextResponse.json({
      success: true,
      projects
    })
  } catch (error) {
    console.error('Error in projects API:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

