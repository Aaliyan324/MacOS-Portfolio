import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const FONT_WEIGHT = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
}

const renderText = (text, className, baseWeight = 400) => {
  return [...text].map((char, i) => (
    <span key={i} className={className} style={{ fontVariationSettings: `'wght' ${baseWeight}` }}>
      {char === " " ? '\u00A0' : char}
    </span>
  ))
}

const setupTextHover = (container, type) => {
  if (!container) return;

  const letters = container.querySelectorAll('span');

  const { min, max, default: base } = FONT_WEIGHT[type];

  const animateLetter = (letter, weight, duration = 0.3) => {
    return gsap.to(letter, { duration, ease: 'power2.out', fontVariationSettings: `'wght' ${weight}` });
  }

  const handleMouseMove = (e) => {
    const { left } = container.getBoundingClientRect();
    const mouseX = e.clientX - left;

    letters.forEach((letter) => {
      const { left: l, width: w } = letter.getBoundingClientRect();
      const distance = Math.abs(mouseX - (l - left + w / 2));
      const intensity = Math.exp(-(distance ** 2) / 2000)

      animateLetter(letter, min + (max - min) * intensity)
    })
  }

  const handleMouseLeave = () => letters.forEach((letter) => animateLetter(letter, base, 0.3))

  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mousemove", handleMouseLeave);

  return () => {
    container.removeEventListener("mousemove", handleMouseLeave);
    container.removeEventListener("mousemove", handleMouseMove);
  }
}

const Welcome = () => {
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)

  useGSAP(() => {
    const titleCleanUp=setupTextHover(titleRef.current, "title");
    const subtitleCleanUp=setupTextHover(subtitleRef.current, "subtitle")

    return()=>{
      subtitleCleanUp()
      titleCleanUp()
    }
  }, [])

  return (
    <section id='welcome'>
      <p ref={subtitleRef}>
        {renderText("Hey, I am Aaliyan! Welcome to my", 'text-3xl font-georama', 100)}

      </p>
      <h1 ref={titleRef} className='mt-6 uppercase'>
        {renderText("Portfolio", 'text-9xl italic font-georama', 400)}
      </h1>

      <div className='small-screen'>
        <p>This portfolio is designed for desktop/tablets only.</p>
      </div>
    </section>
  )
}

export default Welcome