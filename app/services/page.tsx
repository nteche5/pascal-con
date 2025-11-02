import Header from '@/components/Header'
import Footer from '@/components/Footer'
import styles from './page.module.css'

export default function Services() {
  return (
    <>
      <Header />
      <main role="main">
        {/* Page Header */}
        <section className={styles.pageHeader} aria-label="Page header">
          <div className="container">
            <h1>Our Services</h1>
            <p className={styles.pageSubtitle}>
              Comprehensive construction and engineering solutions tailored to your needs
            </p>
          </div>
        </section>

        {/* Construction Services */}
        <section id="construction" className={styles.serviceDetailSection} aria-label="Construction services">
          <div className="container">
            <div className={styles.serviceDetail}>
              <div className={styles.serviceIcon} aria-hidden="true">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5 21V7L13 2L21 7V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 9V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 21V17H15V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2>Construction Services</h2>
              <p className={styles.serviceDescription}>
                We provide comprehensive construction management services from initial planning 
                through project completion. Our team ensures every project is built to the highest 
                standards of safety, quality, and efficiency.
              </p>
              <ul className={styles.serviceList}>
                <li>Residential construction</li>
                <li>Commercial building projects</li>
                <li>Infrastructure development</li>
                <li>Renovation and remodeling</li>
                <li>Project management</li>
                <li>Quality assurance and control</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Engineering Services */}
        <section id="engineering" className={styles.serviceDetailSectionAlt} aria-label="Engineering services">
          <div className="container">
            <div className={styles.serviceDetail}>
              <div className={styles.serviceIcon} aria-hidden="true">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2>Engineering Consultancy</h2>
              <p className={styles.serviceDescription}>
                Our engineering expertise spans structural, civil, and mechanical disciplines. 
                We provide innovative solutions to complex technical challenges, ensuring optimal 
                design and implementation.
              </p>
              <ul className={styles.serviceList}>
                <li>Structural engineering</li>
                <li>Civil engineering</li>
                <li>Mechanical and electrical systems</li>
                <li>Design and analysis</li>
                <li>Technical feasibility studies</li>
                <li>Engineering inspections</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Consultancy Services */}
        <section id="consultancy" className={styles.serviceDetailSection} aria-label="Consultancy services">
          <div className="container">
            <div className={styles.serviceDetail}>
              <div className={styles.serviceIcon} aria-hidden="true">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 16V8C20.9996 7.64928 20.9071 7.30481 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00205 12 2.00205C11.6489 2.00205 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.30481 3.00036 7.64928 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3.27002 6.96L12 12.01L20.73 6.96" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 22.08V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2>Strategic Consultancy</h2>
              <p className={styles.serviceDescription}>
                Our consultancy services provide strategic guidance throughout your project lifecycle. 
                We help you make informed decisions, optimize resources, and achieve your objectives 
                efficiently.
              </p>
              <ul className={styles.serviceList}>
                <li>Project feasibility studies</li>
                <li>Cost estimation and budgeting</li>
                <li>Risk assessment and management</li>
                <li>Regulatory compliance</li>
                <li>Construction planning and scheduling</li>
                <li>Value engineering</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Property Management */}
        <section id="property-management" className={styles.serviceDetailSectionAlt} aria-label="Property management services">
          <div className="container">
            <div className={styles.serviceDetail}>
              <div className={styles.serviceIcon} aria-hidden="true">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5 21V7L13 2L21 7V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 21V13H15V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2>Property Management</h2>
              <p className={styles.serviceDescription}>
                We offer comprehensive property management services to maximize the value and 
                performance of your real estate assets. From maintenance to tenant relations, 
                we handle all aspects of property management.
              </p>
              <ul className={styles.serviceList}>
                <li>Property maintenance and repairs</li>
                <li>Tenant relations and leasing</li>
                <li>Financial management and reporting</li>
                <li>Facility management</li>
                <li>Property inspections</li>
                <li>Asset optimization</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection} aria-label="Call to action">
          <div className="container">
            <h2>Ready to Start Your Project?</h2>
            <p className={styles.ctaText}>
              Contact us today to discuss how we can help bring your vision to life.
            </p>
            <a href="/contact" className="btn">Get in Touch</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

