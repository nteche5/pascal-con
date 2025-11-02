'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import styles from './page.module.css'

type Settings = {
  companyName?: string | null
  contactEmail?: string | null
  contactPhone?: string | null
  heroVideoUrl?: string | null
  heroPosterUrl?: string | null
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/admin/settings')
        const json = await res.json()
        if (json.success) {
          setSettings(json.settings || {})
        } else {
          setStatus('Failed to load settings')
        }
      } catch (e) {
        setStatus('Failed to load settings')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, [e.target.name]: e.target.value })
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setStatus(null)
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
      const json = await res.json()
      if (json.success) {
        setSettings(json.settings)
        setStatus('Settings saved')
      } else {
        setStatus(json.message || 'Failed to save')
      }
    } catch (e) {
      setStatus('Failed to save')
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <Header />
      <main role="main">
        <section className={styles.pageHeader} aria-label="Admin settings">
          <div className="container">
            <h1>Settings</h1>
            <p className={styles.pageSubtitle}>Configure company info and hero media</p>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <div className={styles.card}>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <form onSubmit={handleSave}>
                  <div className={styles.formGroup}>
                    <label htmlFor="companyName">Company Name</label>
                    <input id="companyName" name="companyName" value={settings.companyName || ''} onChange={handleChange} />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="contactEmail">Contact Email</label>
                    <input id="contactEmail" name="contactEmail" type="email" value={settings.contactEmail || ''} onChange={handleChange} />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="contactPhone">Contact Phone</label>
                    <input id="contactPhone" name="contactPhone" value={settings.contactPhone || ''} onChange={handleChange} />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="heroVideoUrl">Hero Video URL</label>
                    <input id="heroVideoUrl" name="heroVideoUrl" value={settings.heroVideoUrl || ''} onChange={handleChange} />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="heroPosterUrl">Hero Poster URL</label>
                    <input id="heroPosterUrl" name="heroPosterUrl" value={settings.heroPosterUrl || ''} onChange={handleChange} />
                  </div>

                  <div className={styles.actions}>
                    <button type="submit" className="btn" disabled={saving} aria-disabled={saving}>
                      {saving ? 'Saving...' : 'Save Settings'}
                    </button>
                    <Link href="/admin/dashboard" className={styles.backLink}>← Back to Dashboard</Link>
                  </div>
                  {status && <div className={styles.status}>{status}</div>}
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}


