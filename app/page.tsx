'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import styles from './page.module.css'
import Link from 'next/link'
import Hero from '@/components/Hero'
import { useState, useEffect } from 'react'

interface Project {
  id: string
  title: string
  category: string
  description: string
  image?: string
  files?: Array<{ url?: string; name?: string }>
}

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([])
  const [isLoadingProjects, setIsLoadingProjects] = useState(true)
  const [activeTab, setActiveTab] = useState('buildings')
  const [activeESG, setActiveESG] = useState('strategy')

  useEffect(() => {
    // Fetch featured projects
    const fetchFeaturedProjects = async () => {
      try {
        const response = await fetch('/api/projects', { cache: 'no-store' })
        const data = await response.json()
        
        if (data.success && data.projects) {
          // Get first 6 projects as featured (PCL style - more projects)
          setFeaturedProjects(data.projects.slice(0, 6))
        }
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setIsLoadingProjects(false)
      }
    }

    fetchFeaturedProjects()
  }, [])

  const serviceContent = {
    buildings: {
      title: 'Stunning structures, sustainably built',
      description: 'Our network of construction professionals brings expertise to every project. From educational facilities and institutional buildings to residential complexes and commercial developments, we deliver structures that stand the test of time. With a commitment to quality, integrity, and sustainability, we build not just buildings, but lasting legacies for communities across Africa.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop&q=80'
    },
    civil: {
      title: 'Infrastructure that connects communities',
      description: 'We design and construct civil infrastructure projects that enhance connectivity and drive economic growth. Our expertise spans roads, bridges, water systems, and public works that serve as the backbone of thriving communities. Every project is executed with precision and a focus on long-term sustainability.',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=800&fit=crop&q=80'
    },
    industrial: {
      title: 'Heavy industrial expertise, delivered safely',
      description: 'Our heavy industrial construction capabilities cover manufacturing facilities, power plants, refineries, and specialized industrial complexes. We combine advanced construction techniques with stringent safety protocols to deliver projects that meet the most demanding industrial requirements.',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&h=800&fit=crop&q=80'
    },
    projects: {
      title: 'Special projects, exceptional results',
      description: 'From unique architectural challenges to complex engineering solutions, our special projects division tackles the most demanding assignments. We bring innovative thinking and proven execution to projects that require specialized expertise and meticulous attention to detail.',
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&h=800&fit=crop&q=80'
    }
  }

  const esgContent = {
    strategy: {
      label: 'ENVIRONMENTAL, SOCIAL, AND GOVERNANCE STRATEGY',
      title: 'Building Today to Transform Tomorrow',
      description: 'We support a healthy and more equitable future for our people, our business, and our planet through our ESG strategy. Our commitment to environmental sustainability, social responsibility, and strong governance guides every project we undertake.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop&q=80'
    },
    community: {
      label: 'COMMUNITY ENGAGEMENT',
      title: 'Making a Difference in Communities',
      description: 'We believe in giving back to the communities where we build. Through partnerships, volunteer work, and community investment programs, we create lasting positive impact that extends far beyond construction projects.',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=800&fit=crop&q=80'
    },
    dei: {
      label: 'DIVERSITY, EQUITY & INCLUSION',
      title: 'Building a Diverse and Inclusive Workforce',
      description: 'Our strength lies in our diversity. We are committed to creating an inclusive environment where every team member can thrive, contribute, and grow. Equity and inclusion are foundational to our culture and our success.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop&q=80'
    },
    environmental: {
      label: 'ENVIRONMENTAL SUSTAINABILITY',
      title: 'Sustainable Construction for a Better Future',
      description: 'We are committed to reducing our environmental footprint through sustainable construction practices, green building technologies, and innovative solutions that protect our planet for future generations.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop&q=80'
    },
    innovation: {
      label: 'INNOVATION & TECHNOLOGY',
      title: 'Leading with Innovation',
      description: 'We leverage cutting-edge technology and innovative construction methods to deliver projects more efficiently, safely, and sustainably. Our commitment to innovation drives continuous improvement in everything we do.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop&q=80'
    },
    safety: {
      label: 'SAFETY & HEALTH',
      title: 'Safety First, Always',
      description: 'The safety and health of our people, partners, and communities is our highest priority. We maintain the highest safety standards through comprehensive training, rigorous protocols, and a culture of safety excellence.',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=800&fit=crop&q=80'
    }
  }

  return (
    <>
      <Header variant="overlay" />
      <main role="main">
        <Hero
          title="Building Excellence. Delivering Value."
          subtitle="PKSA is your trusted partner for innovative construction and engineering solutions across Africa — combining precision, strength, and reliability to deliver projects that exceed expectations."
          primaryCta={{ href: '/projects', label: 'View Our Projects' }}
          secondaryCta={{ href: '/contact', label: 'Get in Touch' }}
          backgroundVideoSrc="/videos/hero-background.mp4"
        />

        {/* What We Do Section - PCL Style */}
        <section className={styles.whatWeDoSection} aria-label="What we do">
          <div className="container">
            <div className={styles.whatWeDoHeader}>
              <span className={styles.sectionLabel}>WHAT WE DO</span>
              <h2 className={styles.whatWeDoTitle}>We have a vision for the future of construction.</h2>
            </div>
            
            <div className={styles.serviceTabs}>
              <button
                className={`${styles.serviceTab} ${activeTab === 'buildings' ? styles.active : ''}`}
                onClick={() => setActiveTab('buildings')}
                aria-pressed={activeTab === 'buildings'}
              >
                Buildings
              </button>
              <button
                className={`${styles.serviceTab} ${activeTab === 'civil' ? styles.active : ''}`}
                onClick={() => setActiveTab('civil')}
                aria-pressed={activeTab === 'civil'}
              >
                Civil Infrastructure
              </button>
              <button
                className={`${styles.serviceTab} ${activeTab === 'industrial' ? styles.active : ''}`}
                onClick={() => setActiveTab('industrial')}
                aria-pressed={activeTab === 'industrial'}
              >
                Heavy Industrial
              </button>
              <Link
                href="/projects"
                className={styles.serviceTab}
              >
                Special Projects
              </Link>
            </div>

            <div className={styles.serviceContent}>
              <div className={styles.serviceImageWrapper}>
                <img 
                  src={serviceContent[activeTab as keyof typeof serviceContent].image} 
                  alt={serviceContent[activeTab as keyof typeof serviceContent].title}
                  className={styles.serviceImage}
                  onError={(e) => {
                    // Fallback to placeholder if image doesn't exist
                    const target = e.target as HTMLImageElement
                    target.src = 'data:image/svg+xml,%3Csvg width="800" height="600" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="800" height="600" fill="%23f0f0f0"/%3E%3Cpath d="M200 300L300 250L400 280L500 200L600 250V400H200V300Z" fill="%234A9982" opacity="0.3"/%3E%3Ccircle cx="400" cy="300" r="40" fill="%234A9982" opacity="0.5"/%3E%3C/svg%3E'
                  }}
                />
              </div>
              <div className={styles.serviceText}>
                <h3 className={styles.serviceTitle}>
                  {serviceContent[activeTab as keyof typeof serviceContent].title}
                </h3>
                <p className={styles.serviceDescription}>
                  {serviceContent[activeTab as keyof typeof serviceContent].description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Projects Section - PCL Style */}
        {!isLoadingProjects && featuredProjects.length > 0 && (
          <section className={styles.projectsSection} aria-label="Featured projects">
            <div className={styles.projectsContainer}>
              <div className={styles.projectsGrid}>
                {featuredProjects.map((project, index) => {
                  const projectImage = project.image || (project.files && project.files.length > 0 && project.files[0]?.url) || null
                  const isLarge = index === 0 || index === 3 // First and fourth projects are larger
                  return (
                    <Link 
                      key={project.id} 
                      href={`/projects/${project.id}`}
                      className={`${styles.projectCard} ${isLarge ? styles.projectCardLarge : ''}`}
                    >
                      <div className={styles.projectImageWrapper}>
                        {projectImage ? (
                          <img 
                            src={projectImage} 
                            alt={project.title}
                            className={styles.projectImage}
                          />
                        ) : (
                          <div className={styles.projectPlaceholder} aria-hidden="true">
                            <svg width="100%" height="100%" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect width="400" height="300" fill="#f0f0f0"/>
                              <path d="M100 150L150 120L200 140L250 100L300 130V200H100V150Z" fill="#4A9982" opacity="0.3"/>
                              <circle cx="200" cy="150" r="30" fill="#4A9982" opacity="0.5"/>
                            </svg>
                          </div>
                        )}
                        <div className={styles.projectOverlay}>
                          <div className={styles.projectInfo}>
                            <span className={styles.projectCategory}>{project.category}</span>
                            <h3 className={styles.projectTitle}>{project.title}</h3>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
              <div className={styles.projectsFooter}>
                <Link href="/projects" className={styles.viewAllLink}>
                  View All Projects
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Our Culture Section */}
        <section className={styles.cultureSection} aria-label="Our culture">
          <div className="container">
            <div className={styles.cultureContent}>
              <h2 className={styles.cultureTitle}>Our Culture</h2>
              <p className={styles.cultureDescription}>
                Our vision is to be the highest-value provider of global construction services and technical 
                expertise while we make a difference in the lives of people, customers, the community, and the environment.
              </p>
            </div>
          </div>
        </section>

        {/* ESG Strategy Section - Turner Construction Style */}
        <section className={styles.esgSection} aria-label="ESG Strategy">
          <div className={styles.esgContainer}>
            <div className={styles.esgNav}>
              <button
                className={`${styles.esgNavItem} ${activeESG === 'strategy' ? styles.active : ''}`}
                onClick={() => setActiveESG('strategy')}
              >
                <span className={styles.esgNavNumber}>01</span>
                <span className={styles.esgNavLabel}>ESG Strategy</span>
              </button>
              <button
                className={`${styles.esgNavItem} ${activeESG === 'community' ? styles.active : ''}`}
                onClick={() => setActiveESG('community')}
              >
                <span className={styles.esgNavNumber}>02</span>
                <span className={styles.esgNavLabel}>Community</span>
              </button>
              <button
                className={`${styles.esgNavItem} ${activeESG === 'dei' ? styles.active : ''}`}
                onClick={() => setActiveESG('dei')}
              >
                <span className={styles.esgNavNumber}>03</span>
                <span className={styles.esgNavLabel}>DE&I</span>
              </button>
              <button
                className={`${styles.esgNavItem} ${activeESG === 'environmental' ? styles.active : ''}`}
                onClick={() => setActiveESG('environmental')}
              >
                <span className={styles.esgNavNumber}>04</span>
                <span className={styles.esgNavLabel}>Environmental</span>
              </button>
              <button
                className={`${styles.esgNavItem} ${activeESG === 'innovation' ? styles.active : ''}`}
                onClick={() => setActiveESG('innovation')}
              >
                <span className={styles.esgNavNumber}>05</span>
                <span className={styles.esgNavLabel}>Innovation</span>
              </button>
              <button
                className={`${styles.esgNavItem} ${activeESG === 'safety' ? styles.active : ''}`}
                onClick={() => setActiveESG('safety')}
              >
                <span className={styles.esgNavNumber}>06</span>
                <span className={styles.esgNavLabel}>Safety</span>
              </button>
            </div>
            <div className={styles.esgContent}>
              <div className={styles.esgTextWrapper}>
                <span className={styles.esgLabel}>
                  {esgContent[activeESG as keyof typeof esgContent].label}
                </span>
                <h3 className={styles.esgTitle}>
                  {esgContent[activeESG as keyof typeof esgContent].title}
                </h3>
                <p className={styles.esgDescription}>
                  {esgContent[activeESG as keyof typeof esgContent].description}
                </p>
                <Link href="/about" className={styles.esgLearnMore}>
                  LEARN MORE
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
              <div className={styles.esgImageWrapper}>
                <img 
                  src={esgContent[activeESG as keyof typeof esgContent].image} 
                  alt={esgContent[activeESG as keyof typeof esgContent].title}
                  className={styles.esgImage}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = 'data:image/svg+xml,%3Csvg width="800" height="600" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="800" height="600" fill="%23f0f0f0"/%3E%3Cpath d="M200 300L300 250L400 280L500 200L600 250V400H200V300Z" fill="%234A9982" opacity="0.3"/%3E%3Ccircle cx="400" cy="300" r="40" fill="%234A9982" opacity="0.5"/%3E%3C/svg%3E'
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* About Section - PCL Style */}
        <section className={styles.aboutSection} aria-label="About">
          <div className="container">
            <div className={styles.aboutContent}>
              <div className={styles.aboutText}>
                <h2 className={styles.aboutTitle}>
                  The flexibility to mobilize the right people to deliver unique solutions
                </h2>
                <p className={styles.aboutDescription}>
                  An unwavering focus on delivering value to your business bottom line; and the capability 
                  to leverage innovation to meet emerging challenges and keep you at the fore. This is PKSA.
                </p>
                <p className={styles.aboutDescription}>
                  As a trusted partner, we collaborate and innovate to help our clients thrive. Our culture 
                  of excellence drives your success. Whether you are in the buildings, civil, or industrial 
                  market, partnering with PKSA means you&apos;re gaining a proven, reliable and trusted 
                  full-service partner with expertise across Africa.
                </p>
                <Link href="/about" className={styles.aboutLink}>
                  Learn More About Us
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

