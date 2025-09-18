// app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Aman Kumar — Full Stack Developer',
  description: 'I build cloud-native apps with Java, React, and Spring Boot.'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
