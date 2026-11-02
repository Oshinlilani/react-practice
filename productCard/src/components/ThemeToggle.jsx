import { useContext } from "react";
import  ThemeContext  from "../context/ThemeContext";

export default function ThemeToggle() {
  const {theme, toggle} = useContext(ThemeContext)

  return (
    <button onClick={toggle}>
      Switch to {theme === "light" ? "dark" : "light"} mode
    </button>
  )
}