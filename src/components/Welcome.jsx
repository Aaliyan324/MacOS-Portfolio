import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const FONT_WEIGHT = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
}

const renderText = (text, className, baseWeight = 400) => {
  return [...text].map((char, i) => (
    <span
      key={i}
      className={className}
      style={{
        display: 'inline-block',
        fontVariationSettings: `'wght' ${baseWeight}`,
        whiteSpace: 'pre',
      }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ))
}

const setupTextHover = (container, type) => {
  if (!container) return () => {}

  const letters = [...container.querySelectorAll('span')]
  const { min, max, default: base } = FONT_WEIGHT[type]

  /*
   * Store the original width of every letter.
   * This prevents the text from changing layout when
   * the font weight changes.
   */
  letters.forEach((letter) => {
    const width = letter.getBoundingClientRect().width

    letter.style.width = `${width}px`
    letter.style.display = 'inline-block'
  })

  // Smooth GSAP setters
  const weightSetters = letters.map((letter) =>
    gsap.quickTo(letter, 'fontVariationSettings', {
      duration: 0.6,
      ease: 'power3.out',
    })
  )

  const handleMouseMove = (e) => {
    const mouseX = e.clientX

    letters.forEach((letter, index) => {
      const rect = letter.getBoundingClientRect()
      const center = rect.left + rect.width / 2

      const distance = Math.abs(mouseX - center)

      /*
       * Wider falloff = smoother transition
       */
      const intensity = Math.exp(
        -(distance * distance) / 5000
      )

      const weight =
        min + (max - min) * intensity

      weightSetters[index](`'wght' ${weight}`)
    })
  }

  const handleMouseLeave = () => {
    weightSetters.forEach((setter) => {
      setter(`'wght' ${base}`)
    })
  }

  container.addEventListener('mousemove', handleMouseMove)
  container.addEventListener('mouseleave', handleMouseLeave)

  return () => {
    container.removeEventListener('mousemove', handleMouseMove)
    container.removeEventListener('mouseleave', handleMouseLeave)

    weightSetters.forEach((setter) => {
      gsap.killTweensOf(setter)
    })
  }
}

const Welcome = () => {
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)

  useGSAP(() => {
    const titleCleanup = setupTextHover(
      titleRef.current,
      'title'
    )

    const subtitleCleanup = setupTextHover(
      subtitleRef.current,
      'subtitle'
    )

    return () => {
      titleCleanup()
      subtitleCleanup()
    }
  }, [])

  return (
    <section id="welcome">

      <p ref={subtitleRef}>
        {renderText(
          'Hey, I am Aaliyan! Welcome to my',
          'text-3xl font-georama',
          100
        )}
      </p>

      <h1
        ref={titleRef}
        className="mt-6 uppercase"
      >
        {renderText(
          'Portfolio',
          'text-9xl italic font-georama',
          400
        )}
      </h1>

      <div className="small-screen">
        <p>
          This portfolio is designed for desktop/tablets only.
        </p>
      </div>

    </section>
  )
}

export default Welcome