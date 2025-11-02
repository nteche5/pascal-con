import Header from '@/components/Header'
import Footer from '@/components/Footer'
import styles from './page.module.css'

export default function About() {
  return (
    <>
      <Header />
      <main role="main">
        {/* Page Header */}
        <section className={styles.pageHeader} aria-label="Page header">
          <div className="container">
            <h1>About Us</h1>
            <p className={styles.pageSubtitle}>
              Building Africa's Future Through Excellence and Innovation
            </p>
          </div>
        </section>

        {/* Mission Statement */}
        <section className={styles.missionSection} aria-label="Mission statement">
          <div className="container">
            <div className={styles.contentBlock}>
              <h2>Our Mission</h2>
              <p className={styles.missionText}>
                To be the preferred construction partner for private, commercial, and government 
                entities, delivering exceptional value through innovation and efficiency while 
                maintaining the highest standards of safety and quality.
              </p>
            </div>
          </div>
        </section>

        {/* Vision Statement */}
        <section className={styles.visionSection} aria-label="Vision statement">
          <div className="container">
            <div className={styles.contentBlock}>
              <h2>Our Vision</h2>
              <p className={styles.visionText}>
                To expand across Africa as the construction leader synonymous with high-value 
                service, providing a full spectrum of real estate development and property 
                management solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Brand Values */}
        <section className={styles.valuesSection} aria-label="Brand values">
          <div className="container">
            <h2 className={styles.sectionTitle}>Our Core Values</h2>
            <div className={styles.valuesGrid}>
              <div className={styles.valueItem}>
                <h3>Strength</h3>
                <p>
                  We build with robust materials and proven methodologies, creating 
                  structures that endure and inspire confidence.
                </p>
              </div>
              <div className={styles.valueItem}>
                <h3>Precision</h3>
                <p>
                  Every detail matters. We approach each project with meticulous attention 
                  to accuracy and excellence.
                </p>
              </div>
              <div className={styles.valueItem}>
                <h3>Reliability</h3>
                <p>
                  You can count on us to deliver on our promises, on time and within 
                  budget, every single time.
                </p>
              </div>
              <div className={styles.valueItem}>
                <h3>Innovation</h3>
                <p>
                  We embrace cutting-edge technologies and innovative solutions to solve 
                  complex challenges.
                </p>
              </div>
              <div className={styles.valueItem}>
                <h3>Value</h3>
                <p>
                  We are committed to delivering exceptional value, optimizing every aspect 
                  of our projects for maximum benefit.
                </p>
              </div>
              <div className={styles.valueItem}>
                <h3>Sustainability</h3>
                <p>
                  We build responsibly, considering environmental impact and creating 
                  sustainable solutions for future generations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className={styles.whySection} aria-label="Why choose us">
          <div className="container">
            <h2 className={styles.sectionTitle}>Why Choose PKSA?</h2>
            <p className={styles.sectionIntro}>
              As your value-driven partner, we combine decades of expertise with innovative 
              thinking to deliver construction and engineering solutions that exceed expectations.
            </p>
            <div className={styles.whyGrid}>
              <div className={styles.whyCard}>
                <h3>Expert Team</h3>
                <p>
                  Our skilled professionals bring years of experience and a passion for 
                  excellence to every project.
                </p>
              </div>
              <div className={styles.whyCard}>
                <h3>Proven Track Record</h3>
                <p>
                  With numerous successful projects across various sectors, we have 
                  established a reputation for reliability and quality.
                </p>
              </div>
              <div className={styles.whyCard}>
                <h3>Client-Focused Approach</h3>
                <p>
                  We work closely with our clients, understanding their unique needs and 
                  delivering tailored solutions.
                </p>
              </div>
              <div className={styles.whyCard}>
                <h3>Comprehensive Services</h3>
                <p>
                  From initial planning to project completion and beyond, we offer 
                  end-to-end solutions for all your construction needs.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

