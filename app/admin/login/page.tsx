'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import styles from './page.module.css'

export default function AdminLogin() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    // Check if already logged in
    const checkSession = async () => {
      try {
        const response = await fetch('/api/admin/session')
        const data = await response.json()
        
        if (data.authenticated) {
          router.push('/admin/dashboard')
        }
      } catch (error) {
        console.error('Session check error:', error)
      } finally {
        setIsChecking(false)
      }
    }

    checkSession()
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address')
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // Force a hard refresh to ensure cookies are set
        window.location.href = '/admin/dashboard'
      } else {
        setError(data.message || 'Invalid email or password')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isChecking) {
    return (
      <>
        <Header />
        <main role="main" className={styles.loadingContainer}>
          <div className="container">
            <p>Checking authentication...</p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main role="main">
        <section className={styles.pageHeader} aria-label="Admin login">
          <div className="container">
            <h1>Admin Login</h1>
            <p className={styles.pageSubtitle}>
              Login to access the admin dashboard and upload projects
            </p>
          </div>
        </section>

        <section className={styles.loginSection}>
          <div className="container">
            <div className={styles.loginContainer}>
              <form onSubmit={handleSubmit} className={styles.loginForm} noValidate>
                <div className={styles.formGroup}>
                  <label htmlFor="email">
                    Email <span aria-label="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    autoComplete="email"
                    placeholder="admin@pksa.com"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="password">
                    Password <span aria-label="required">*</span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    autoComplete="current-password"
                  />
                </div>

                {error && (
                  <div className={styles.errorMessage} role="alert">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn"
                  disabled={isSubmitting}
                  aria-disabled={isSubmitting}
                >
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

