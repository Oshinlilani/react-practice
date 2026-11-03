import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggle } = useContext(ThemeContext);

  const themeClasses =
  theme === "dark"
    ? "bg-blue-900 text-white border border-blue-500"
    : "bg-white text-black border border-gray-300";

  return (
    <div className={`${themeClasses} min-h-screen flex justify-center items-center bg-blue-500 px-4 py-2 rounded-lg `}>
      <button onClick={toggle} className="">
        Switch to {theme === "light" ? "dark" : "light"} mode
      </button>
    </div>
  );
}