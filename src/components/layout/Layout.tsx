import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function Layout() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const location = useLocation();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden text-foreground">
      <Sidebar toggleTheme={toggleTheme} isDark={isDark} />
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header */}
        <header className="h-16 shrink-0 border-b flex items-center justify-between px-8 bg-card/50 backdrop-blur-md z-10">
          <h1 className="text-xl font-semibold capitalize text-foreground/80">
            {location.pathname === "/" ? "Dashboard Overview" : location.pathname.substring(1).replace("-", " ")}
          </h1>
          <div className="flex items-center gap-4">
            {/* Mock Header Actions */}
            <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold text-sm border border-purple-200 dark:border-purple-800">
              U
            </div>
          </div>
        </header>
        
        {/* Content Area */}
        <div className="flex-1 overflow-auto p-8 relative scroll-smooth">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="h-full max-w-7xl mx-auto"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
