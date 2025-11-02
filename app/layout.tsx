import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PKSA Construction & Engineering Consultancy Ltd | The Value-Driven Partner',
  description: 'PKSA is a trusted partner providing unparalleled value via innovation, efficiency, and quality. We deliver construction and engineering solutions that satisfy the highest levels of safety, quality, and sustainability.',
  keywords: 'construction, engineering, consultancy, Ghana, Africa, real estate development, property management',
  authors: [{ name: 'PKSA Construction & Engineering Consultancy Ltd' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#4A9982',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}

