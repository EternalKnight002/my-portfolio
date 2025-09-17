'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Nav() {
  const pathname = usePathname() || '/'

  const linkClass = (href: string) =>
    `text-sm font-medium px-3 py-1 rounded ${
      pathname === href ? 'text-indigo-600' : 'text-gray-600 hover:text-gray-900'
    }`

  return (
    <header className="header border-b bg-white/80 backdrop-blur-sm fixed inset-x-0 top-0 z-40">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold">
          Aman Kumar
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          <Link href="/#skills" className={linkClass('/#skills')}>
            Skills
          </Link>
          <Link href="/#projects" className={linkClass('/#projects')}>
            Projects
          </Link>
          <Link href="/#exploring" className={linkClass('/#exploring')}>
            Exploring
          </Link>
          <Link href="/#contact" className={linkClass('/#contact')}>
            Contact
          </Link>
          <a
            href="/resume.pdf"
            download
            className="ml-4 inline-block px-3 py-1 rounded border text-sm text-gray-700 hover:bg-gray-50"
          >
            Resume
          </a>
        </nav>

        {/* Mobile menu placeholder */}
        <div className="md:hidden">
          <button
            aria-label="Open menu"
            className="p-2 rounded text-gray-600 hover:bg-gray-100"
            onClick={() => alert('Mobile menu not implemented yet')}
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  )
}
