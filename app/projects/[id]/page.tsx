'use client'

import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { getProjectById } from '@/lib/projects'
import styles from './page.module.css'
import { useEffect, useState } from 'react'

export default function ProjectDetail() {
  const params = useParams()
  const [project, setProject] = useState<ReturnType<typeof getProjectById> | null>(null)
  
  useEffect(() => {
    if (params?.id) {
      const foundProject = getProjectById(params.id as string)
      setProject(foundProject)
    }
  }, [params?.id])

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
            <div className={styles.placeholderImage} aria-hidden="true">
              <svg width="100%" height="100%" viewBox="0 0 1200 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="1200" height="600" fill="#f0f0f0"/>
                <path d="M200 300L400 200L600 250L800 150L1000 200V400H200V300Z" fill="#4A9982" opacity="0.3"/>
                <circle cx="600" cy="300" r="50" fill="#4A9982" opacity="0.5"/>
              </svg>
            </div>
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
                <p className={styles.fullDescription}>{project.fullDescription}</p>

                <h3>Key Features</h3>
                <ul className={styles.featuresList}>
                  {project.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              {/* Sidebar */}
              <div className={styles.sidebar}>
                <div className={styles.infoCard}>
                  <h3>Project Information</h3>
                  <dl className={styles.infoList}>
                    <div className={styles.infoItem}>
                      <dt>Location</dt>
                      <dd>{project.location}</dd>
                    </div>
                    <div className={styles.infoItem}>
                      <dt>Year</dt>
                      <dd>{project.year}</dd>
                    </div>
                    <div className={styles.infoItem}>
                      <dt>Size</dt>
                      <dd>{project.size}</dd>
                    </div>
                    <div className={styles.infoItem}>
                      <dt>Status</dt>
                      <dd>
                        <span className={`${styles.status} ${styles[project.status.toLowerCase().replace(' ', '')]}`}>
                          {project.status}
                        </span>
                      </dd>
                    </div>
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

