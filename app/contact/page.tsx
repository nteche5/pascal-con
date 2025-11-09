'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useState } from 'react'
import styles from './page.module.css'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          subject: 'General Inquiry', // Default subject for simplified form
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          message: ''
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Header />
      <main role="main">
        <section className={styles.contactSection} aria-label="Contact information and form">
          <div className={styles.contactBackground}>
            <div className={styles.contactWatermark}>CONTACT</div>
          </div>
          <div className="container">
            <div className={styles.contactGrid}>
              {/* Left Section - Contact Information */}
              <div className={styles.contactInfo}>
                <h1 className={styles.contactHeading}>Get in touch</h1>
                <p className={styles.contactSubheading}>
                  Have questions or ready to bring your construction and engineering projects to life?
                </p>

                <div className={styles.contactCards}>
                  <a href="mailto:pascalproperties4@gmail.com" className={styles.contactCard}>
                    <div className={styles.cardIcon}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className={styles.cardContent}>
                      <div className={styles.cardTitle}>Email us</div>
                      <div className={styles.cardValue}>pascalproperties4@gmail.com</div>
                    </div>
                    <div className={styles.cardArrow}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </a>

                  <a href="tel:+233555810550" className={styles.contactCard}>
                    <div className={styles.cardIcon}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7292C21.7209 20.9842 21.5573 21.2126 21.3522 21.3979C21.1472 21.5832 20.9053 21.7212 20.6441 21.8021C20.3829 21.883 20.1085 21.9049 19.84 21.866C16.7428 21.3862 13.787 20.3341 11.19 18.78C8.77382 17.3721 6.72533 15.3236 5.32 12.91C3.76253 10.305 2.71226 7.33945 2.24 4.234C2.20107 3.96554 2.22296 3.69111 2.30385 3.42993C2.38475 3.16874 2.52277 2.92683 2.70806 2.72182C2.89335 2.51681 3.12178 2.35325 3.37678 2.24166C3.63179 2.13006 3.9075 2.07311 4.186 2.074H7.186C7.70094 2.07287 8.19586 2.27265 8.56889 2.63097C8.94192 2.98928 9.16345 3.48025 9.186 3.995C9.30329 5.57656 9.69532 7.13112 10.346 8.586C10.5168 8.96505 10.5832 9.38504 10.5383 9.80042C10.4933 10.2158 10.3386 10.6103 10.09 10.94L8.09 13.94C10.4501 16.9018 13.5982 19.6499 17.09 22C20.087 19.9993 22.5434 17.2894 22.5434 17.2894L19.5434 15.289C19.2137 15.0399 18.8192 14.8846 18.4038 14.8391C17.9884 14.7937 17.5684 14.8598 17.1894 15.03C15.7344 15.6775 14.1799 16.0674 12.5984 16.183C12.0836 16.2055 11.5926 16.427 11.2343 16.8C10.876 17.1731 10.6762 17.668 10.6774 18.183L10.6774 21.183H10.6674Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className={styles.cardContent}>
                      <div className={styles.cardTitle}>Call us</div>
                      <div className={styles.cardValue}>+233 555 810 550</div>
                    </div>
                    <div className={styles.cardArrow}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </a>

                  <div className={styles.contactCard}>
                    <div className={styles.cardIcon}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className={styles.cardContent}>
                      <div className={styles.cardTitle}>Our location</div>
                      <div className={styles.cardValue}>Ghana, Africa, Tema</div>
                    </div>
                    <div className={styles.cardArrow}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section - Contact Form */}
              <div className={styles.contactForm}>
                <form onSubmit={handleSubmit} noValidate>
                  <div className={styles.formGroup}>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      className={styles.formInput}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      className={styles.formInput}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      required
                      aria-required="true"
                      className={styles.formTextarea}
                    ></textarea>
                  </div>

                  {submitStatus === 'success' && (
                    <div className={styles.successMessage} role="alert">
                      Thank you! Your message has been sent successfully.
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className={styles.errorMessage} role="alert">
                      Sorry, there was an error sending your message. Please try again.
                    </div>
                  )}

                  <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={isSubmitting}
                    aria-disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Submit'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

