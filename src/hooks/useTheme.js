import { useEffect, useState } from 'react'

export const THEMES = Object.freeze({
  LIGHT: 'light',
  DARK: 'dark'
})

export function useTheme () {
  const [theme, setTheme] = useState(localStorage.getItem('color-theme') || THEMES.LIGHT)

  const tooggleTheme = () => {
    setTheme(theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT)
  }

  useEffect(() => {
    document.documentElement.classList.add(theme)
    localStorage.setItem('color-theme', theme)
    return () => {
      document.documentElement.classList.remove(theme)
    }
  }, [theme])

  return { theme, tooggleTheme }
}
