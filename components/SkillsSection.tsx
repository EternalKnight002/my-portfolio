// components/SkillsSection.tsx
'use client'
import React, { useRef, useState } from 'react'
import { skills } from '../data/skills'

export default function SkillsSection() {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const pause = () => {
    if (trackRef.current) {
      trackRef.current.style.animationPlayState = 'paused'
    }
  }

  const resume = () => {
    if (trackRef.current) {
      trackRef.current.style.animationPlayState = 'running'
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    
    setIsDragging(true)
    pause()
    setStartX(e.pageX - containerRef.current.offsetLeft)
    setScrollLeft(containerRef.current.scrollLeft)
    
    // Prevent text selection while dragging
    e.preventDefault()
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return
    
    e.preventDefault()
    const x = e.pageX - containerRef.current.offsetLeft
    const walk = (x - startX) * 2 // Adjust drag sensitivity
    containerRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false)
      resume()
    }
  }

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false)
      resume()
    }
  }

  // Handle touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current) return
    
    setIsDragging(true)
    pause()
    setStartX(e.touches[0].pageX - containerRef.current.offsetLeft)
    setScrollLeft(containerRef.current.scrollLeft)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return
    
    const x = e.touches[0].pageX - containerRef.current.offsetLeft
    const walk = (x - startX) * 2
    containerRef.current.scrollLeft = scrollLeft - walk
  }

  const handleTouchEnd = () => {
    if (isDragging) {
      setIsDragging(false)
      resume()
    }
  }

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-semibold">Skills</h2>
        <p className="mt-3 text-gray-600 max-w-2xl">
          Core skills I use daily and continuously improve.
        </p>

        {/* Horizontal Marquee */}
        <div
          ref={containerRef}
          className={`marquee mt-8 ${isDragging ? 'dragging' : ''}`}
          role="region"
          aria-label="Scrolling list of skills. Click and drag to navigate."
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            ref={trackRef}
            className="marquee-track"
            tabIndex={0}
            onFocus={pause}
            onBlur={resume}
            style={{ outline: 'none' }}
          >
            {/* First copy of skills */}
            <div className="marquee-content">
              {skills.map((skill) => (
                <button
                  key={skill.name + '-1'}
                  className="skill-pill"
                  type="button"
                  data-skill={skill.name}
                >
                  {skill.name}
                </button>
              ))}
            </div>

            {/* Duplicate copy for seamless loop */}
            <div className="marquee-content" aria-hidden="true">
              {skills.map((skill, idx) => (
                <div
                  key={skill.name + '-2-' + idx}
                  className="skill-pill"
                  tabIndex={-1}
                  aria-hidden="true"
                  data-skill={skill.name}
                >
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}