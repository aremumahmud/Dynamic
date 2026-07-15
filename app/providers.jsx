'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { ThemeProvider } from '../src/contexts/ThemeContext'

export default function Providers({ children }) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 120,
      easing: 'ease-in-out',
    })
  }, [])

  return (
    <ThemeProvider>
      <div className="container">{children}</div>
    </ThemeProvider>
  )
}
