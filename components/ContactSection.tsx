// components/ContactSection.tsx
'use client'
export default function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-semibold">Get in touch</h2>
        <p className="mt-3 text-gray-600">Looking for collaboration or full-time roles — feel free to reach out.</p>
        <a href="mailto:your.email@example.com" className="mt-6 inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg">
          Email me
        </a>
      </div>
    </section>
  )
}
