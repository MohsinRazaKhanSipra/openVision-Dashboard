import { Link, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";
import { useAuthStore } from "../../store/auth";
import {
  LayoutDashboard,
  Video,
  Settings,
  Shield,
  LogOut,
  Moon,
  Sun,
  Camera,
  Layers,
  Activity,
} from "lucide-react";

export function Sidebar({ toggleTheme, isDark }: { toggleTheme: () => void, isDark: boolean }) {
  const { user, logout } = useAuthStore();
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Cameras", href: "/cameras", icon: Camera },
    { name: "Models", href: "/models", icon: Layers },
    { name: "Solutions", href: "/solutions", icon: Video },
    { name: "Logs", href: "/logs", icon: Activity },
  ];

  if (user?.role === "admin") {
    navItems.push({ name: "Admin Settings", href: "/admin", icon: Shield });
  }

  return (
    <div className="flex flex-col h-screen w-64 bg-card border-r shadow-sm">
      <div className="flex h-16 shrink-0 items-center px-6 border-b">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-purple-600 dark:text-purple-400">
          <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center">
            <Camera size={20} />
          </div>
          openVision
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-4 py-4 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href || (item.href !== "/" && location.pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-purple-100 text-purple-900 dark:bg-purple-900/50 dark:text-purple-100"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 shrink-0",
                  isActive ? "text-purple-600 dark:text-purple-400" : "text-muted-foreground group-hover:text-foreground"
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t p-4 flex flex-col gap-2">
        <div className="flex items-center justify-between mb-2 px-2">
          <div className="flex flex-col">
            <span className="text-sm font-medium truncate">{user?.name}</span>
            <span className="text-xs text-muted-foreground uppercase">{user?.role}</span>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            {isDark ? <Sun size={18} className="text-muted-foreground" /> : <Moon size={18} className="text-muted-foreground" />}
          </button>
        </div>
        
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Log out
        </button>
      </div>
    </div>
  );
}
