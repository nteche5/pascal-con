'use client'

import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import styles from './page.module.css'
import { useEffect, useState } from 'react'

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
  features?: string[]
}

export default function ProjectDetail() {
  const params = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const fetchProject = async () => {
      if (!params?.id) {
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        const response = await fetch(`/api/projects/${params.id}`, {
          cache: 'no-store'
        })
        const data = await response.json()
        
        if (data.success && data.project) {
          setProject(data.project)
        } else {
          setProject(null)
        }
      } catch (error) {
        console.error('Error fetching project:', error)
        setProject(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProject()
  }, [params?.id])

  if (isLoading) {
    return (
      <>
        <Header />
        <main role="main">
          <section className={styles.backSection}>
            <div className="container">
              <Link href="/projects" className={styles.backLink}>
                ← Back to Projects
              </Link>
            </div>
          </section>
          <section style={{ padding: '4rem 0', textAlign: 'center' }}>
            <div className="container">
              <p>Loading project...</p>
            </div>
          </section>
        </main>
        <Footer />
      </>
    )
  }

  if (!project) {
    return (
      <>
        <Header />
        <main role="main">
          <section className={styles.backSection}>
            <div className="container">
              <Link href="/projects" className={styles.backLink}>
                ← Back to Projects
              </Link>
            </div>
          </section>
          <section style={{ padding: '4rem 0', textAlign: 'center' }}>
            <div className="container">
              <h1>Project Not Found</h1>
              <p>The project you&apos;re looking for doesn&apos;t exist.</p>
              <Link href="/projects" className="btn">
                View All Projects
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main role="main">
        {/* Back Button */}
        <section className={styles.backSection}>
          <div className="container">
            <Link href="/projects" className={styles.backLink}>
              ← Back to Projects
            </Link>
          </div>
        </section>

        {/* Project Hero */}
        <section className={styles.projectHero}>
          <div className={styles.heroImage}>
            {project.image ? (
              <img 
                src={project.image} 
                alt={project.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <div className={styles.placeholderImage} aria-hidden="true">
                <svg width="100%" height="100%" viewBox="0 0 1200 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="1200" height="600" fill="#f0f0f0"/>
                  <path d="M200 300L400 200L600 250L800 150L1000 200V400H200V300Z" fill="#4A9982" opacity="0.3"/>
                  <circle cx="600" cy="300" r="50" fill="#4A9982" opacity="0.5"/>
                </svg>
              </div>
            )}
            <div className={styles.heroOverlay}>
              <div className="container">
                <span className={styles.category}>{project.category}</span>
                <h1>{project.title}</h1>
              </div>
            </div>
          </div>
        </section>

        {/* Project Details */}
        <section className={styles.projectDetails}>
          <div className="container">
            <div className={styles.detailsGrid}>
              {/* Main Content */}
              <div className={styles.mainContent}>
                <h2>Project Overview</h2>
                <p className={styles.fullDescription}>{project.fullDescription || project.description}</p>

                {project.files && project.files.length > 0 && (
                  <>
                    <h3>Project Images</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                      {project.files.map((file, index) => (
                        file.url && (
                          <img 
                            key={index}
                            src={file.url} 
                            alt={file.name || `Project image ${index + 1}`}
                            style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
                          />
                        )
                      ))}
                    </div>
                  </>
                )}

                {project.features && project.features.length > 0 && (
                  <>
                    <h3>Key Features</h3>
                    <ul className={styles.featuresList}>
                      {project.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

              {/* Sidebar */}
              <div className={styles.sidebar}>
                <div className={styles.infoCard}>
                  <h3>Project Information</h3>
                  <dl className={styles.infoList}>
                    {project.location && (
                      <div className={styles.infoItem}>
                        <dt>Location</dt>
                        <dd>{project.location}</dd>
                      </div>
                    )}
                    {project.year && (
                      <div className={styles.infoItem}>
                        <dt>Year</dt>
                        <dd>{project.year}</dd>
                      </div>
                    )}
                    {project.size && (
                      <div className={styles.infoItem}>
                        <dt>Size</dt>
                        <dd>{project.size}</dd>
                      </div>
                    )}
                    {project.status && (
                      <div className={styles.infoItem}>
                        <dt>Status</dt>
                        <dd>
                        <span className={`${styles.status} ${project.status.toLowerCase().replace(' ', '-')}`}>
                          {project.status}
                        </span>
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>

                <div className={styles.ctaCard}>
                  <h3>Interested in Similar Projects?</h3>
                  <p>Contact us to discuss how we can help with your next project.</p>
                  <Link href="/contact" className="btn">
                    Get in Touch
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className={styles.navigationSection}>
          <div className="container">
            <Link href="/projects" className="btn">
              View All Projects
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

