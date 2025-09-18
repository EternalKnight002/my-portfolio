// components/ContactSection.tsx
'use client'
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-semibold">Get in touch</h2>
        <p className="mt-3 text-gray-600">
          Looking for collaboration or full-time roles — feel free to reach out.
        </p>

        <a
          href="mailto:resoamamkumar@gmail.com"
          className="mt-6 inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg shimmer-hover"
        >
          Email me
        </a>

        {/* Social Icons */}
        <div className="mt-6 flex justify-center gap-6 text-2xl text-gray-600">
          <a
            href="https://github.com/EternalKnight002"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-600 transition shimmer-hover"
          >
            <FaGithub />
          </a>
          <a
            href="https://x.com/Eternalknigh"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-600 transition shimmer-hover"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.linkedin.com/in/aman-kumar-537a73296/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-600 transition shimmer-hover"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </section>
  )
}
