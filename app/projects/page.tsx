'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import styles from './page.module.css'
import { useState, useEffect } from 'react'

interface Project {
  id: string
  title: string
  category: string
  description: string
  fullDescription?: string
  location?: string
  year?: string
  size?: string
  status?: string
  image?: string
  files?: Array<{ url?: string; name?: string }>
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoadingProjects, setIsLoadingProjects] = useState(true)

  useEffect(() => {
    // Fetch projects from API
    const fetchProjects = async () => {
      try {
        setIsLoadingProjects(true)
        const response = await fetch('/api/projects', {
          cache: 'no-store'
        })
        const data = await response.json()
        
        if (data.success && data.projects) {
          setProjects(data.projects)
        } else {
          console.error('Failed to fetch projects:', data.message)
          setProjects([])
        }
      } catch (error) {
        console.error('Error fetching projects:', error)
        setProjects([])
      } finally {
        setIsLoadingProjects(false)
      }
    }

    fetchProjects()
  }, [])

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

        {/* Projects Grid */}
        <section className={styles.projectsSection} aria-label="Projects portfolio">
          <div className="container">
            {isLoadingProjects ? (
              <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                <p>Loading projects...</p>
              </div>
            ) : projects.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                <p>No projects found. Upload your first project to get started!</p>
              </div>
            ) : (
              <div className={styles.projectsGrid}>
                {projects.map((project) => {
                  const projectImage = project.image || (project.files && project.files.length > 0 && project.files[0]?.url) || null
                  return (
                    <article key={project.id} className={styles.projectCard}>
                      <div className={styles.projectImage}>
                        {projectImage ? (
                          <img 
                            src={projectImage} 
                            alt={project.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        ) : (
                          <div className={styles.placeholderImage} aria-hidden="true">
                            <svg width="100%" height="100%" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect width="400" height="300" fill="#f0f0f0"/>
                              <path d="M100 150L150 120L200 140L250 100L300 130V200H100V150Z" fill="#4A9982" opacity="0.3"/>
                              <circle cx="200" cy="150" r="30" fill="#4A9982" opacity="0.5"/>
                            </svg>
                          </div>
                        )}
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
                  )
                })}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection} aria-label="Call to action">
          <div className="container">
            <h2>Have a Project in Mind?</h2>
            <p className={styles.ctaText}>
              Let&apos;s discuss how we can bring your vision to life with our expertise and commitment to excellence.
            </p>
            <Link href="/contact" className="btn">Start Your Project</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

