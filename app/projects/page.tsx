'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import styles from './page.module.css'
import { getAllProjects } from '@/lib/projects'
import { useState, useEffect } from 'react'

export default function Projects() {
  const projects = getAllProjects()
  const [isAdmin, setIsAdmin] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
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
    // Check if user is admin
    const checkAdminStatus = async () => {
      try {
        const response = await fetch('/api/admin/session', {
          credentials: 'include', // Ensure cookies are sent
          cache: 'no-store'
        })
        const data = await response.json()
        setIsAdmin(data.authenticated || false)
      } catch (error) {
        console.error('Error checking admin status:', error)
        setIsAdmin(false)
      } finally {
        setIsCheckingAuth(false)
      }
    }

    checkAdminStatus()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
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

  return (
    <>
      <Header />
      <main role="main">
        {/* Page Header */}
        <section className={styles.pageHeader} aria-label="Page header">
          <div className="container">
            <h1>Our Projects</h1>
            <p className={styles.pageSubtitle}>
              Showcasing excellence in construction and engineering across Africa
            </p>
          </div>
        </section>

        {/* Upload Form Section - Admin Only */}
        {!isCheckingAuth && isAdmin && (
          <section className={styles.uploadSection} aria-label="Project upload form">
            <div className="container">
              <div className={styles.uploadFormContainer}>
                <div className={styles.uploadHeader}>
                  <h2>Upload a New Project</h2>
                  <Link href="/admin/dashboard" className={styles.backToDashboard}>
                    ← Back to Dashboard
                  </Link>
                </div>
                <p className={styles.uploadDescription}>
                  Share your project details and images with us
                </p>
                <form onSubmit={handleSubmit} className={styles.uploadForm} noValidate>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="title">
                      Project Title <span aria-label="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      aria-required="true"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="category">
                      Category <span aria-label="required">*</span>
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      aria-required="true"
                    >
                      <option value="">Select category</option>
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Infrastructure">Infrastructure</option>
                      <option value="Industrial">Industrial</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="location">Location</label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="year">Year</label>
                    <input
                      type="text"
                      id="year"
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      placeholder="e.g., 2024"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="size">Size</label>
                    <input
                      type="text"
                      id="size"
                      name="size"
                      value={formData.size}
                      onChange={handleChange}
                      placeholder="e.g., 5,000 sqm"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="status">Status</label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="">Select status</option>
                      <option value="Completed">Completed</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Planning">Planning</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="description">
                    Description <span aria-label="required">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    required
                    aria-required="true"
                    placeholder="Brief description of the project"
                  ></textarea>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="fullDescription">Full Description</label>
                  <textarea
                    id="fullDescription"
                    name="fullDescription"
                    value={formData.fullDescription}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Detailed description of the project"
                  ></textarea>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="projectFiles">
                    Project Images/Files
                  </label>
                  <input
                    type="file"
                    id="projectFiles"
                    name="projectFiles"
                    onChange={handleFileChange}
                    multiple
                    accept="image/*,.pdf,.doc,.docx"
                  />
                  {selectedFiles.length > 0 && (
                    <div className={styles.fileList}>
                      <p>Selected files:</p>
                      <ul>
                        {selectedFiles.map((file, index) => (
                          <li key={index}>{file.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {submitStatus === 'success' && (
                  <div className={styles.successMessage} role="alert">
                    Thank you! Your project has been submitted successfully.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className={styles.errorMessage} role="alert">
                    Sorry, there was an error submitting your project. Please try again.
                  </div>
                )}

                <button
                  type="submit"
                  className="btn"
                  disabled={isSubmitting}
                  aria-disabled={isSubmitting}
                >
                  {isSubmitting ? 'Uploading...' : 'Upload Project'}
                </button>
                </form>
              </div>
            </div>
          </section>
        )}

        {/* Admin Login Prompt - Show when not logged in */}
        {!isCheckingAuth && !isAdmin && (
          <section className={styles.uploadSection} aria-label="Admin login prompt">
            <div className="container">
              <div className={styles.loginPrompt}>
                <h2>Upload a New Project</h2>
                <p className={styles.loginPromptText}>
                  You need to be logged in as an admin to upload projects.
                </p>
                <Link href="/admin/login" className="btn">
                  Admin Login
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Projects Grid */}
        <section className={styles.projectsSection} aria-label="Projects portfolio">
          <div className="container">
            <div className={styles.projectsGrid}>
              {projects.map((project) => (
                <article key={project.id} className={styles.projectCard}>
                  <div className={styles.projectImage}>
                    <div className={styles.placeholderImage} aria-hidden="true">
                      <svg width="100%" height="100%" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="400" height="300" fill="#f0f0f0"/>
                        <path d="M100 150L150 120L200 140L250 100L300 130V200H100V150Z" fill="#4A9982" opacity="0.3"/>
                        <circle cx="200" cy="150" r="30" fill="#4A9982" opacity="0.5"/>
                      </svg>
                    </div>
                    <span className={styles.projectCategory}>{project.category}</span>
                  </div>
                  <div className={styles.projectContent}>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <Link href={`/projects/${project.id}`} className={styles.projectLink}>
                      View Project →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection} aria-label="Call to action">
          <div className="container">
            <h2>Have a Project in Mind?</h2>
            <p className={styles.ctaText}>
              Let's discuss how we can bring your vision to life with our expertise and commitment to excellence.
            </p>
            <Link href="/contact" className="btn">Start Your Project</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

