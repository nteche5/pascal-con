import { getSupabaseAdminClient } from './supabase-admin'

const TABLE_NAME = 'project_submissions'

export type ProjectSubmissionFile = {
  name: string
  path: string
  url: string | null
  type: string | null
  size: number | null
}

export type ProjectSubmissionInput = {
  title: string
  category: string
  description: string
  location?: string | null
  year?: string | null
  size?: string | null
  status?: string | null
  fullDescription?: string | null
  files: ProjectSubmissionFile[]
}

export type ProjectSubmission = ProjectSubmissionInput & {
  id: string
  submittedAt: string
}

export async function saveProjectSubmission(input: ProjectSubmissionInput): Promise<ProjectSubmission> {
  const supabase = getSupabaseAdminClient()

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert({
      title: input.title,
      category: input.category,
      description: input.description,
      location: input.location ?? null,
      year: input.year ?? null,
      size: input.size ?? null,
      status: input.status ?? null,
      full_description: input.fullDescription ?? null,
      files: input.files,
    })
    .select()
    .single()

  if (error) {
    console.error('Error saving project submission:', error)
    throw new Error('Failed to store project submission')
  }

  return {
    id: data.id,
    title: data.title,
    category: data.category,
    description: data.description,
    location: data.location,
    year: data.year,
    size: data.size,
    status: data.status,
    fullDescription: data.full_description,
    files: data.files ?? [],
    submittedAt: data.created_at ?? new Date().toISOString(),
  }
}

