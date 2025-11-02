import Header from '@/components/Header'
import Footer from '@/components/Footer'
import styles from './page.module.css'
import Link from 'next/link'
import Hero from '@/components/Hero'
import StatsStrip from '@/components/StatsStrip'

export default function Home() {
  return (
    <>
      <Header variant="overlay" />
      <main role="main">
        <Hero
          title="Building Excellence. Delivering Value."
          subtitle="PKSA is your trusted partner for innovative construction and engineering solutions across Africa — combining precision, strength, and reliability to deliver projects that exceed expectations."
          primaryCta={{ href: '/projects', label: 'View Our Projects' }}
          secondaryCta={{ href: '/contact', label: 'Get in Touch' }}
          backgroundVideoSrc="/videos/f3.mp4"
        />

        <StatsStrip
          stats={[
            { value: '10+', label: 'Years Experience' },
            { value: '120+', label: 'Projects Delivered' },
            { value: '30+', label: 'Expert Engineers' },
            { value: '5', label: 'Sectors Served', sublabel: 'Public & Private' },
          ]}
        />

        {/* Value Proposition Section */}
        <section className={styles.valueSection} aria-label="Value proposition">
          <div className="container">
            <h2 className={styles.sectionTitle}>The Value-Driven Partner</h2>
            <p className={styles.sectionIntro}>
              We provide unparalleled value through innovation, efficiency, and quality, 
              delivering construction and engineering solutions that satisfy the highest 
              levels of safety, quality, and sustainability.
            </p>

            <div className={styles.valueGrid}>
              <div className={styles.valueCard}>
                <div className={styles.valueIcon} aria-hidden="true">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Innovation</h3>
                <p>
                  Cutting-edge solutions that push the boundaries of construction 
                  and engineering excellence.
                </p>
              </div>

              <div className={styles.valueCard}>
                <div className={styles.valueIcon} aria-hidden="true">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Efficiency</h3>
                <p>
                  Optimized processes and streamlined workflows that deliver 
                  results on time and within budget.
                </p>
              </div>

              <div className={styles.valueCard}>
                <div className={styles.valueIcon} aria-hidden="true">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Quality</h3>
                <p>
                  Uncompromising standards ensuring every project meets the highest 
                  levels of safety and durability.
                </p>
              </div>

              <div className={styles.valueCard}>
                <div className={styles.valueIcon} aria-hidden="true">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Sustainability</h3>
                <p>
                  Environmentally responsible practices that create lasting value 
                  for communities and future generations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Preview Section */}
        <section className={styles.servicesSection} aria-label="Services">
          <div className="container">
            <h2 className={styles.sectionTitle}>Our Services</h2>
            <p className={styles.sectionIntro}>
              A comprehensive range of construction and engineering services tailored 
              to meet your unique project requirements.
            </p>

            <div className={styles.servicesGrid}>
              <div className={styles.serviceCard}>
                <h3>Construction</h3>
                <p>
                  Full-service construction management from planning to completion, 
                  delivering projects that stand the test of time.
                </p>
                <Link href="/services#construction" className={styles.serviceLink}>
                  Learn More →
                </Link>
              </div>

              <div className={styles.serviceCard}>
                <h3>Engineering</h3>
                <p>
                  Expert engineering consultancy providing innovative solutions 
                  for complex technical challenges.
                </p>
                <Link href="/services#engineering" className={styles.serviceLink}>
                  Learn More →
                </Link>
              </div>

              <div className={styles.serviceCard}>
                <h3>Consultancy</h3>
                <p>
                  Strategic advisory services to guide your projects from concept 
                  to successful delivery.
                </p>
                <Link href="/services#consultancy" className={styles.serviceLink}>
                  Learn More →
                </Link>
              </div>

              <div className={styles.serviceCard}>
                <h3>Property Management</h3>
                <p>
                  Comprehensive property management solutions ensuring optimal 
                  performance and value retention.
                </p>
                <Link href="/services#property-management" className={styles.serviceLink}>
                  Learn More →
                </Link>
              </div>
            </div>

            <div className={styles.servicesAction}>
              <Link href="/services" className="btn">
                View All Services
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

