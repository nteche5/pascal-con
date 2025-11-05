'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import styles from './page.module.css'

interface ContactMessage {
  id: string
  name: string
  email: string
  phone?: string | null
  subject: string
  message: string
  submittedAt: string
}

interface Project {
  id: string
  title: string
  category: string
  description: string
  location?: string
  year?: string
  size?: string
  status?: string
  image?: string
  files?: Array<{ url?: string; name?: string }>
  submittedAt: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [isLoadingMessages, setIsLoadingMessages] = useState(true)
  const [showMessages, setShowMessages] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoadingProjects, setIsLoadingProjects] = useState(true)
  const [showProjects, setShowProjects] = useState(false)
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    location: '',
    year: '',
    size: '',
    status: '',
    fullDescription: ''
  })
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  useEffect(() => {
    // Check authentication status
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/session', {
          credentials: 'include', // Ensure cookies are sent
          cache: 'no-store'
        })
        const data = await response.json()
        
        if (data.authenticated) {
          setIsAuthenticated(true)
        } else {
          router.push('/admin/login')
        }
      } catch (error) {
        console.error('Auth check error:', error)
        router.push('/admin/login')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  useEffect(() => {
    // Fetch contact messages and projects when authenticated
    if (isAuthenticated) {
      fetchMessages()
      fetchProjects()
    }
  }, [isAuthenticated])

  useEffect(() => {
    // Check if upload query parameter is present
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const upload = params.get('upload')
      if (upload === 'true') {
        setShowUploadForm(true)
      }
    }
  }, [])

  const fetchMessages = async () => {
    try {
      setIsLoadingMessages(true)
      const response = await fetch('/api/admin/contact-messages', {
        credentials: 'include'
      })
      const data = await response.json()
      
      if (data.success) {
        setMessages(data.messages || [])
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setIsLoadingMessages(false)
    }
  }

  const fetchProjects = async () => {
    try {
      setIsLoadingProjects(true)
      const response = await fetch('/api/projects', {
        credentials: 'include',
        cache: 'no-store'
      })
      const data = await response.json()
      
      if (data.success && data.projects) {
        setProjects(data.projects || [])
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setIsLoadingProjects(false)
    }
  }

  const handleDeleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) {
      return
    }

    try {
      const response = await fetch('/api/admin/contact-messages/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      })

      const data = await response.json()

      if (data.success) {
        setMessages(messages.filter(msg => msg.id !== id))
      } else {
        alert('Failed to delete message')
      }
    } catch (error) {
      console.error('Error deleting message:', error)
      alert('Failed to delete message')
    }
  }

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      return
    }

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (data.success) {
        setProjects(projects.filter(project => project.id !== id))
        alert('Project deleted successfully')
      } else {
        alert(data.message || 'Failed to delete project')
      }
    } catch (error) {
      console.error('Error deleting project:', error)
      alert('Failed to delete project')
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleUploadChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleUploadFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files))
    }
  }

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const formDataToSend = new FormData()
      
      // Append form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value) {
          formDataToSend.append(key, value)
        }
      })

      // Append files
      selectedFiles.forEach((file) => {
        formDataToSend.append('files', file)
      })

      const response = await fetch('/api/projects/upload', {
        method: 'POST',
        credentials: 'include',
        body: formDataToSend,
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setSubmitStatus('success')
        setFormData({
          title: '',
          category: '',
          description: '',
          location: '',
          year: '',
          size: '',
          status: '',
          fullDescription: ''
        })
        setSelectedFiles([])
        // Reset file input
        const fileInput = document.getElementById('projectFiles') as HTMLInputElement
        if (fileInput) {
          fileInput.value = ''
        }
        // Refresh projects list
        await fetchProjects()
        // Hide form after success
        setTimeout(() => {
          setShowUploadForm(false)
          setSubmitStatus('idle')
          router.push('/admin/dashboard')
        }, 2000)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting project:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/admin/logout', {
        method: 'POST',
      })

      if (response.ok) {
        router.push('/admin/login')
        router.refresh()
      }
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  if (isLoading) {
    return (
      <>
        <Header />
        <main role="main" className={styles.loadingContainer}>
          <div className="container">
            <p>Loading...</p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <>
      <Header />
      <main role="main">
        <section className={styles.pageHeader} aria-label="Admin dashboard">
          <div className="container">
            <h1>Admin Dashboard</h1>
            <p className={styles.pageSubtitle}>
              Manage your projects and content
            </p>
          </div>
        </section>

        <section className={styles.dashboardSection}>
          <div className="container">
            <div className={styles.dashboardContent}>
              <div className={styles.dashboardHeader}>
                <h2>Dashboard Overview</h2>
                <button onClick={handleLogout} className={styles.logoutBtn}>
                  Logout
                </button>
              </div>

              <div className={styles.dashboardGrid}>
                <div className={styles.dashboardCard}>
                  <h3>Projects</h3>
                  <p>Manage and view uploaded projects</p>
                  <button 
                    onClick={() => {
                      setShowProjects(!showProjects)
                      if (!showProjects) {
                        fetchProjects()
                      }
                    }}
                    className="btn"
                  >
                    {showProjects ? 'Hide Projects' : `Manage Projects (${projects.length})`}
                  </button>
                </div>

                <div className={styles.dashboardCard}>
                  <h3>Upload Project</h3>
                  <p>Add a new project to the portfolio</p>
                  <button 
                    onClick={() => setShowUploadForm(!showUploadForm)}
                    className="btn"
                  >
                    {showUploadForm ? 'Cancel Upload' : 'Upload Project'}
                  </button>
                </div>

                <div className={styles.dashboardCard}>
                  <h3>View Projects</h3>
                  <p>View projects on the public website</p>
                  <a href="/projects" className="btn" target="_blank" rel="noopener noreferrer">
                    View Projects
                  </a>
                </div>

                <div className={styles.dashboardCard}>
                  <h3>Contact Messages</h3>
                  <p>View and manage contact form submissions</p>
                  <button 
                    onClick={() => {
                      setShowMessages(!showMessages)
                      if (!showMessages) {
                        fetchMessages()
                      }
                    }}
                    className="btn"
                  >
                    {showMessages ? 'Hide Messages' : `View Messages (${messages.length})`}
                  </button>
                </div>

                <div className={styles.dashboardCard}>
                  <h3>Settings</h3>
                  <p>Configure company info and hero media</p>
                  <a href="/admin/settings" className="btn">Open Settings</a>
                </div>
              </div>

              {/* Upload Form Section */}
              {showUploadForm && (
                <div className={styles.messagesSection} style={{ marginTop: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2>Upload a New Project</h2>
                    <button 
                      onClick={() => setShowUploadForm(false)}
                      className="btn"
                      style={{ padding: '0.5rem 1rem' }}
                    >
                      Cancel
                    </button>
                  </div>
                  <form onSubmit={handleUploadSubmit} style={{ maxWidth: '800px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      <div>
                        <label htmlFor="title" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                          Project Title <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                          type="text"
                          id="title"
                          name="title"
                          value={formData.title}
                          onChange={handleUploadChange}
                          required
                          style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
                        />
                      </div>
                      <div>
                        <label htmlFor="category" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                          Category <span style={{ color: 'red' }}>*</span>
                        </label>
                        <select
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleUploadChange}
                          required
                          style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
                        >
                          <option value="">Select category</option>
                          <option value="Residential">Residential</option>
                          <option value="Commercial">Commercial</option>
                          <option value="Infrastructure">Infrastructure</option>
                          <option value="Industrial">Industrial</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                      <label htmlFor="location" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                        Location
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleUploadChange}
                        style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      <div>
                        <label htmlFor="year" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                          Year
                        </label>
                        <input
                          type="text"
                          id="year"
                          name="year"
                          value={formData.year}
                          onChange={handleUploadChange}
                          placeholder="e.g., 2024"
                          style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
                        />
                      </div>
                      <div>
                        <label htmlFor="size" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                          Size
                        </label>
                        <input
                          type="text"
                          id="size"
                          name="size"
                          value={formData.size}
                          onChange={handleUploadChange}
                          placeholder="e.g., 5,000 sqm"
                          style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
                        />
                      </div>
                      <div>
                        <label htmlFor="status" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                          Status
                        </label>
                        <select
                          id="status"
                          name="status"
                          value={formData.status}
                          onChange={handleUploadChange}
                          style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
                        >
                          <option value="">Select status</option>
                          <option value="Completed">Completed</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Planning">Planning</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                      <label htmlFor="description" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                        Description <span style={{ color: 'red' }}>*</span>
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleUploadChange}
                        rows={3}
                        required
                        placeholder="Brief description of the project"
                        style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', fontFamily: 'inherit' }}
                      />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                      <label htmlFor="fullDescription" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                        Full Description
                      </label>
                      <textarea
                        id="fullDescription"
                        name="fullDescription"
                        value={formData.fullDescription}
                        onChange={handleUploadChange}
                        rows={5}
                        placeholder="Detailed description of the project"
                        style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', fontFamily: 'inherit' }}
                      />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                      <label htmlFor="projectFiles" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                        Project Images/Files
                      </label>
                      <input
                        type="file"
                        id="projectFiles"
                        name="projectFiles"
                        onChange={handleUploadFileChange}
                        multiple
                        accept="image/*,.pdf,.doc,.docx"
                        style={{ width: '100%', padding: '0.5rem' }}
                      />
                      {selectedFiles.length > 0 && (
                        <div style={{ marginTop: '0.5rem', padding: '0.5rem', background: '#f5f5f5', borderRadius: '4px' }}>
                          <p style={{ marginBottom: '0.5rem', fontWeight: '500' }}>Selected files:</p>
                          <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                            {selectedFiles.map((file, index) => (
                              <li key={index}>{file.name}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {submitStatus === 'success' && (
                      <div style={{ padding: '1rem', background: '#d4edda', color: '#155724', borderRadius: '4px', marginBottom: '1rem' }}>
                        Project uploaded successfully! Redirecting...
                      </div>
                    )}

                    {submitStatus === 'error' && (
                      <div style={{ padding: '1rem', background: '#f8d7da', color: '#721c24', borderRadius: '4px', marginBottom: '1rem' }}>
                        Error uploading project. Please try again.
                      </div>
                    )}

                    <button
                      type="submit"
                      className="btn"
                      disabled={isSubmitting}
                      style={{ marginTop: '1rem' }}
                    >
                      {isSubmitting ? 'Uploading...' : 'Upload Project'}
                    </button>
                  </form>
                </div>
              )}

              {/* Projects Section */}
              {showProjects && (
                <div className={styles.messagesSection}>
                  <h2>Projects</h2>
                  {isLoadingProjects ? (
                    <p>Loading projects...</p>
                  ) : projects.length === 0 ? (
                    <p className={styles.noMessages}>No projects yet. Upload your first project!</p>
                  ) : (
                    <div className={styles.messagesList}>
                      {projects.map((project) => (
                        <div key={project.id} className={styles.messageCard}>
                          <div className={styles.messageHeader}>
                            <div className={styles.messageInfo}>
                              <h3>{project.title}</h3>
                              <p className={styles.messageEmail}>
                                <strong>Category:</strong> {project.category}
                              </p>
                              {project.location && (
                                <p className={styles.messagePhone}>
                                  <strong>Location:</strong> {project.location}
                                </p>
                              )}
                              {project.status && (
                                <p className={styles.messagePhone}>
                                  <strong>Status:</strong> {project.status}
                                </p>
                              )}
                            </div>
                            <div className={styles.messageMeta}>
                              <span className={styles.messageDate}>{formatDate(project.submittedAt)}</span>
                              <button
                                onClick={() => handleDeleteProject(project.id)}
                                className={styles.deleteBtn}
                                aria-label="Delete project"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                          <div className={styles.messageSubject}>
                            <strong>Description:</strong>
                          </div>
                          <div className={styles.messageContent}>
                            {project.description}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Contact Messages Section */}
              {showMessages && (
                <div className={styles.messagesSection}>
                  <h2>Contact Messages</h2>
                  {isLoadingMessages ? (
                    <p>Loading messages...</p>
                  ) : messages.length === 0 ? (
                    <p className={styles.noMessages}>No contact messages yet.</p>
                  ) : (
                    <div className={styles.messagesList}>
                      {messages.map((message) => (
                        <div key={message.id} className={styles.messageCard}>
                          <div className={styles.messageHeader}>
                            <div className={styles.messageInfo}>
                              <h3>{message.name}</h3>
                              <p className={styles.messageEmail}>
                                <a href={`mailto:${message.email}`}>{message.email}</a>
                              </p>
                              {message.phone && (
                                <p className={styles.messagePhone}>
                                  <a href={`tel:${message.phone}`}>{message.phone}</a>
                                </p>
                              )}
                            </div>
                            <div className={styles.messageMeta}>
                              <span className={styles.messageDate}>{formatDate(message.submittedAt)}</span>
                              <button
                                onClick={() => handleDeleteMessage(message.id)}
                                className={styles.deleteBtn}
                                aria-label="Delete message"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                          <div className={styles.messageSubject}>
                            <strong>Subject:</strong> {message.subject}
                          </div>
                          <div className={styles.messageContent}>
                            {message.message}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

