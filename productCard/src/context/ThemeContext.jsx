import { createContext, useState } from "react"


export const ThemeContext = createContext()


export default function ThemeProvider({children}) {

  const [theme, setTheme] = useState("light")

  const toggle = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}