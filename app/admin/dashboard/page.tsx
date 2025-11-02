'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import styles from './page.module.css'

interface ContactMessage {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  submittedAt: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [isLoadingMessages, setIsLoadingMessages] = useState(true)
  const [showMessages, setShowMessages] = useState(false)

  useEffect(() => {
    // Check authentication status
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/session', {
          credentials: 'include', // Ensure cookies are sent
          cache: 'no-store'
        })
        const data = await response.json()
        
        if (data.authenticated) {
          setIsAuthenticated(true)
        } else {
          router.push('/admin/login')
        }
      } catch (error) {
        console.error('Auth check error:', error)
        router.push('/admin/login')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  useEffect(() => {
    // Fetch contact messages when authenticated
    if (isAuthenticated) {
      fetchMessages()
    }
  }, [isAuthenticated])

  const fetchMessages = async () => {
    try {
      setIsLoadingMessages(true)
      const response = await fetch('/api/admin/contact-messages', {
        credentials: 'include'
      })
      const data = await response.json()
      
      if (data.success) {
        setMessages(data.messages || [])
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setIsLoadingMessages(false)
    }
  }

  const handleDeleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) {
      return
    }

    try {
      const response = await fetch('/api/admin/contact-messages/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      })

      const data = await response.json()

      if (data.success) {
        setMessages(messages.filter(msg => msg.id !== id))
      } else {
        alert('Failed to delete message')
      }
    } catch (error) {
      console.error('Error deleting message:', error)
      alert('Failed to delete message')
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/admin/logout', {
        method: 'POST',
      })

      if (response.ok) {
        router.push('/admin/login')
        router.refresh()
      }
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  if (isLoading) {
    return (
      <>
        <Header />
        <main role="main" className={styles.loadingContainer}>
          <div className="container">
            <p>Loading...</p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <>
      <Header />
      <main role="main">
        <section className={styles.pageHeader} aria-label="Admin dashboard">
          <div className="container">
            <h1>Admin Dashboard</h1>
            <p className={styles.pageSubtitle}>
              Manage your projects and content
            </p>
          </div>
        </section>

        <section className={styles.dashboardSection}>
          <div className="container">
            <div className={styles.dashboardContent}>
              <div className={styles.dashboardHeader}>
                <h2>Dashboard Overview</h2>
                <button onClick={handleLogout} className={styles.logoutBtn}>
                  Logout
                </button>
              </div>

              <div className={styles.dashboardGrid}>
                <div className={styles.dashboardCard}>
                  <h3>Projects</h3>
                  <p>Manage and upload new projects</p>
                  <a href="/projects" className="btn">
                    View Projects
                  </a>
                </div>

                <div className={styles.dashboardCard}>
                  <h3>Upload Project</h3>
                  <p>Add a new project to the portfolio</p>
                  <a href="/projects" className="btn">
                    Upload Project
                  </a>
                </div>

                <div className={styles.dashboardCard}>
                  <h3>Contact Messages</h3>
                  <p>View and manage contact form submissions</p>
                  <button 
                    onClick={() => {
                      setShowMessages(!showMessages)
                      if (!showMessages) {
                        fetchMessages()
                      }
                    }}
                    className="btn"
                  >
                    {showMessages ? 'Hide Messages' : `View Messages (${messages.length})`}
                  </button>
                </div>

                <div className={styles.dashboardCard}>
                  <h3>Settings</h3>
                  <p>Configure admin settings</p>
                  <p className={styles.comingSoon}>Coming Soon</p>
                </div>
              </div>

              {/* Contact Messages Section */}
              {showMessages && (
                <div className={styles.messagesSection}>
                  <h2>Contact Messages</h2>
                  {isLoadingMessages ? (
                    <p>Loading messages...</p>
                  ) : messages.length === 0 ? (
                    <p className={styles.noMessages}>No contact messages yet.</p>
                  ) : (
                    <div className={styles.messagesList}>
                      {messages.map((message) => (
                        <div key={message.id} className={styles.messageCard}>
                          <div className={styles.messageHeader}>
                            <div className={styles.messageInfo}>
                              <h3>{message.name}</h3>
                              <p className={styles.messageEmail}>
                                <a href={`mailto:${message.email}`}>{message.email}</a>
                              </p>
                              {message.phone && (
                                <p className={styles.messagePhone}>
                                  <a href={`tel:${message.phone}`}>{message.phone}</a>
                                </p>
                              )}
                            </div>
                            <div className={styles.messageMeta}>
                              <span className={styles.messageDate}>{formatDate(message.submittedAt)}</span>
                              <button
                                onClick={() => handleDeleteMessage(message.id)}
                                className={styles.deleteBtn}
                                aria-label="Delete message"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                          <div className={styles.messageSubject}>
                            <strong>Subject:</strong> {message.subject}
                          </div>
                          <div className={styles.messageContent}>
                            {message.message}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

