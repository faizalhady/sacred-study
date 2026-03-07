import { Home, BookOpen, Library, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const tabs = [
  { path: "/home", icon: Home, label: "Home" },
  { path: "/learn", icon: BookOpen, label: "Learn" },
  { path: "/library", icon: Library, label: "Library" },
  { path: "/profile", icon: User, label: "Profile" },
];

export function BottomTabBar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide on auth screen and video player
  if (location.pathname === "/" || location.pathname.startsWith("/video/") || location.pathname.startsWith("/reader/")) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-tab-bar border-t border-border safe-bottom">
      <div className="mx-auto max-w-lg flex items-center justify-around h-16">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path || location.pathname.startsWith(tab.path + "/");
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className="relative flex flex-col items-center justify-center gap-0.5 flex-1 h-full"
            >
              {isActive && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full"
                />
              )}
              <tab.icon
                size={22}
                className={isActive ? "text-tab-active" : "text-tab-inactive"}
                strokeWidth={isActive ? 2.5 : 1.8}
              />
              <span
                className={`text-[10px] font-medium ${isActive ? "text-tab-active" : "text-tab-inactive"}`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
